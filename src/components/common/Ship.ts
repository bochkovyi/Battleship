export class Ship {
    constructor (private boardSize: number, private shipLength: number, private isStraight: boolean) {}

    log() {
        console.log(this.boardSize, this.shipLength, this.isStraight);
    }
}