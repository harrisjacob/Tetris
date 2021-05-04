//Default Piece class to encapsulate common methods among game pieces

export default class BasicPiece {

    constructor() {
        this.speed = 0.01;
        this.currentRotation = 0;
    };

    fall() {
        if (this.getMinY() > 0.5) {
            this.cubeA.cube.position.y -= 1;
            this.cubeB.cube.position.y -= 1;
            this.cubeC.cube.position.y -= 1;
            this.cubeD.cube.position.y -= 1;
        }

    };

    rotate() {

        this.currentRotation = this.currentRotation % this.rotations.A.length; //Reset rotations counter to 0 upon max rotations

        let rot = this.currentRotation;
        //A
        this.cubeA.cube.position.x += this.rotations.A[rot].x;
        this.cubeA.cube.position.y += this.rotations.A[rot].y;

        //B
        this.cubeB.cube.position.x += this.rotations.B[rot].x;
        this.cubeB.cube.position.y += this.rotations.B[rot].y;

        //C
        this.cubeC.cube.position.x += this.rotations.C[rot].x;
        this.cubeC.cube.position.y += this.rotations.C[rot].y;

        //D
        this.cubeD.cube.position.x += this.rotations.D[rot].x;
        this.cubeD.cube.position.y += this.rotations.D[rot].y;

        this.currentRotation += 1;

    };

    moveLeft() {
        this.cubeA.cube.position.x -= 1;
        this.cubeB.cube.position.x -= 1;
        this.cubeC.cube.position.x -= 1;
        this.cubeD.cube.position.x -= 1;
    };

    moveRight() {
        this.cubeA.cube.position.x += 1;
        this.cubeB.cube.position.x += 1;
        this.cubeC.cube.position.x += 1;
        this.cubeD.cube.position.x += 1;
    };

    getMinY() {
        return Math.min(this.cubeA.cube.position.y, this.cubeB.cube.position.y, this.cubeC.cube.position.y, this.cubeD.cube.position.y)
    };

    dropOne() {
        this.cubeA.cube.position.y -= 1;
        this.cubeB.cube.position.y -= 1;
        this.cubeC.cube.position.y -= 1;
        this.cubeD.cube.position.y -= 1;
    }

    getLeftCol() {
        return Math.min(this.cubeA.cube.position.x, this.cubeB.cube.position.x, this.cubeC.cube.position.x, this.cubeD.cube.position.x)
    }

    getRightCol() {
        return Math.max(this.cubeA.cube.position.x, this.cubeB.cube.position.x, this.cubeC.cube.position.x, this.cubeD.cube.position.x)
    }

};
