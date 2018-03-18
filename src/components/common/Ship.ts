import { CellData } from '../Grid/Cell/Cell';

export class Ship {
    private hitCount = 0;
    private board: CellData[];
    private shipLocation: number[];
    private squaredBoardSize: number;
    private isHorizontal: boolean;
    private pivotalPoint: number;
    private infiniteLoopCounter = 0;

    constructor (private boardSize: number, private shipLength: number, private isStraight: boolean) {}

    placeShip(board: CellData[]): any {
        this.board = board;
        this.squaredBoardSize = this.boardSize ** 2;
        this.isHorizontal = this.getRandomBetween(0, 2) === 1 ? true : false;
        this.pivotalPoint = Math.round(this.shipLength / 2);
        this.shipLocation = [];

        const isSingle = this.shipLength === 1;
        let firstCell = this.getFirstCell();
        this.shipLocation.push(firstCell);
        
        if (!isSingle) {
            while (this.shipLocation.length < this.shipLength) {
                this.handleInfiniteLoop();
                if (!this.isStraight && this.pivotalPoint === this.shipLocation.length) {
                    this.isHorizontal = !this.isHorizontal;
                }
                let nextStep;
                let randomInt = this.getRandomBetween(0, 2); // 0 or 1
                let options = [];
                let currentPosition = this.shipLocation[this.shipLocation.length - 1];
                if (this.isHorizontal) {
                    options.push(this.getLeft(currentPosition));
                    options.push(this.getRight(currentPosition));
                } else {
                    options.push(this.getTop(currentPosition));
                    options.push(this.getBottom(currentPosition));
                }
                
                // Remove already taken numbers from options of two elements
                options = options.filter(item => this.shipLocation.indexOf(item) === -1);
                // If in pivotal point, there is still possibly two elements available.
                nextStep = options.length === 2 ? options[randomInt] : options[0];
                // Finally, if the selected cell is unavailable, start from scratch
                if (nextStep === -1 || !this.isValidPlacement(nextStep)) {
                    return this.placeShip(board);
                }

                // Testing
                // [...document.querySelectorAll('.cell-item')].forEach(item => item.click());
                // At this step next item can be pushed to locations array
                this.shipLocation.push(nextStep);
            }
        }
        this.shipLocation.forEach(item => board[item].ship = this);
        // console.log('this.shipLocation', this.shipLocation);
    }

    getFirstCell(): number {
        let cellPlacementAttempt = this.getRandomNumber();
        while (!this.isValidPlacement(cellPlacementAttempt)) {
            this.handleInfiniteLoop();
            cellPlacementAttempt = this.getRandomNumber();
        }
        return cellPlacementAttempt;
    }

    getRandomNumber() {
        return this.getRandomBetween(0, this.boardSize ** 2);
    }

    getRandomBetween(start: number, finishExclusive: number) {
        return Math.floor(Math.random() * (finishExclusive - start) + start);
    }

    isValidPlacement(cellNumber: number) {
        let result = this.isFree(cellNumber);
        if (result) {
            this.getAjacentCells(cellNumber).forEach(cellNumberItem => {
                if (!this.isFree(cellNumberItem)) {
                    result = false;
                }
            });
        }

        return result;
    }

    isSunk() {
        return this.hitCount === this.shipLength;
    }

    hit() {
        this.hitCount++;
    }

    getPath() {
        return this.shipLocation;
    }

    private handleInfiniteLoop() {
        this.infiniteLoopCounter++;
        if (this.infiniteLoopCounter > 1000) {
            alert(`Ship with length ${this.shipLength} was not placed due to infinite loop. 
            Please mind reducing the number/length of ships.`);
            throw new Error('Infinite loop.');
        }
    }

    private getAjacentCells(cellNumber: number): number[] {
        return [
            this.getLeft(cellNumber),
            this.getTopLeft(cellNumber),
            this.getTop(cellNumber),
            this.getTopRight(cellNumber),
            this.getRight(cellNumber),
            this.getBottomRight(cellNumber),
            this.getBottom(cellNumber),
            this.getBottomLeft(cellNumber)
        ].filter(item => item !== -1);
    }

    private getLeft(cellNumber: number): number {
        let result = cellNumber - 1;
        return cellNumber % this.boardSize === 0 ? -1 : result;
    }

    private getTopLeft(cellNumber: number): number {
        let result = cellNumber - 1 - this.boardSize;
        return cellNumber % this.boardSize === 0 || result < 0 ? -1 : result;
    }

    private getTop(cellNumber: number): number {
        let result = cellNumber - this.boardSize;
        return result < 0 ? -1 : result;
    }

    private getTopRight(cellNumber: number): number {
        let result = cellNumber + 1 - this.boardSize;
        return cellNumber % this.boardSize === this.boardSize - 1 || result < 0 ? -1 : result;
    }

    private getRight(cellNumber: number): number {
        let result = cellNumber + 1;
        return cellNumber % this.boardSize === this.boardSize - 1 ? -1 : result;
    }

    private getBottomRight(cellNumber: number): number {
        let result = cellNumber + 1 + this.boardSize;
        return cellNumber % this.boardSize === this.boardSize - 1 || result >= this.squaredBoardSize ? -1 : result;
    }

    private getBottom(cellNumber: number): number {
        let result = cellNumber + this.boardSize;
        return result >= this.squaredBoardSize ? -1 : result;
    }

    private getBottomLeft(cellNumber: number): number {
        let result = cellNumber - 1 + this.boardSize;
        return cellNumber % this.boardSize === 0 || result >= this.squaredBoardSize ? -1 : result;
    }

    private isFree(cellNumber: number) {
        return this.board[cellNumber].ship === null;
    }
}