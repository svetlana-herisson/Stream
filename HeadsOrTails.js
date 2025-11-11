const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const logFileName = process.argv[2];
if (!logFileName) {
    console.error("Пожалуйста, укажите имя файла для логирования.");
    process.exit(1);
}

function playGame() {
    const rundomNumber = Math.floor((Math.random() * 2) + 1);

    rl.question('Угадай число(1 или 2): ', (userInput) => {
        const userGuess = parseInt(userInput);

        if (userGuess !== 1 && userGuess !== 2) {
            console.log('Пожалуйста, ведите 1 или 2');
            playGame()
            return;
        }
        const date = new Date().toISOString()
        const resuluserAnswert = userGuess === rundomNumber ? "Вы угадали" : `Вы не угадали, загаданное число было: ${rundomNumber}`
        const result =  `${date}: ${resuluserAnswert}`
        console.log(result);

        const file = path.join(__dirname, "result.txt");
        fs.appendFile(file, result + '\n', (err) => {
            if (err) throw new Error(err);
            console.log("Результат записан в файл.");
        })

        setTimeout(() => {rl.question("Хотите сыграть еще раз? (да/ нет): ", (answer) => {
                if (answer.toLowerCase() === 'да') {
                    playGame();
                } else {
                    console.log('Спасибо за игру!');
                    rl.close();
                }
            })
        }, 1000)
    });

}
playGame();