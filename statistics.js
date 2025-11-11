const fs = require('fs');
const path = require('path');
1
const logFilePath = process.argv[1]
if (!logFilePath) {
    console.error("Пожалуйста, укажите путь к файлу логов.");
    process.exit(1);
}

fs.readFile('result.txt', 'utf-8', (err, data) => {
    if (err) throw Error(err);

    const lines = data.trim().split('\n');
    const totalGames = lines.length;
    let wins = 0;
    let losses = 0;

    lines.forEach(line => {
        if(line.includes('Вы угадали')) {
            wins++;
        } else if (line.includes('Вы не угадали')){
            losses++
        }
    })

     const winPercentage = totalGames > 0 ? (wins / totalGames * 100).toFixed(2) : 0;

    console.log(`Общее количество партий: ${totalGames}`);
    console.log(`Количество выигранных партий: ${wins}`);
    console.log(`Количество проигранных партий: ${losses}`);
    console.log(`Процент выигранных партий: ${winPercentage}%`);
})

