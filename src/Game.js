const { Console } = require("@woowacourse/mission-utils");
const Computer = require("./Computer");
const { exception, pickedWrongChoice } = require("./Exception");
const { GAME } = require("./setting/message");

const START_VALUE = 0;
const STRIKE_VALUE = 3;
const GAME_RESTART = "1";
const GAME_EXIT = "2";

class Game {
    constructor() {
        // this.startMessage = new Computer().startMessage();
        Console.print(GAME.START);
        this.computersNumber = new Computer().pickedNum();
    }

    // 유저와 컴퓨터 대조해서 스트라이크 볼 갯수 리턴
    getStrikeAndBall(computersNumber, usersNumber) {
        let howManyStrike = START_VALUE;
        let howManyBall = START_VALUE;

        usersNumber.forEach((number, idx) => {
            if (number === computersNumber[idx]) howManyStrike++;
            if (number !== computersNumber[idx] && computersNumber.includes(number)) howManyBall++;
        });

        return [howManyStrike, howManyBall];
    }
    
    // 입력된 숫자 대조 결과 출력
    resultMessage(howManyStrike, howManyBall) {
        if (howManyStrike && !howManyBall) return Console.print(`${howManyStrike}스트라이크`);
        if (!howManyStrike && howManyBall) return Console.print(`${howManyBall}볼`);
        if (howManyStrike && howManyBall) return Console.print(`${howManyBall}볼 ${howManyStrike}스트라이크`);
        return Console.print("낫싱");
    }

    playGame() {    
        Console.readLine(GAME.INPUT_NUMBER, usersNumber => {
            exception(usersNumber);
            usersNumber = this.getUsersArray(usersNumber);
  
            const [howManyStrike, howManyBall] = this.getStrikeAndBall(this.computersNumber, usersNumber);
            this.resultMessage(howManyStrike, howManyBall);
            
            if (howManyStrike !== STRIKE_VALUE) this.playGame();
            if (howManyStrike === STRIKE_VALUE) this.gameOver();
        });
    }
    
    gameOver() {
        Console.print(GAME.SUCCESS);
        Console.readLine(GAME.RESTART_OR_EXIT, (choice) => {
            if (choice === GAME_RESTART) return this.pickedRestart();
            if (choice === GAME_EXIT) return this.pickedClose();
            return pickedWrongChoice();
        });
    }

    getUsersArray(usersNumber) {
        return [...usersNumber].map(idx => parseInt(idx));
    }

    pickedRestart() {
        this.computersNumber = new Computer().pickedNum();
        this.playGame();
        return ;
    }

    pickedClose() {
        Console.close();
        return ;
    }

}

module.exports = Game;
