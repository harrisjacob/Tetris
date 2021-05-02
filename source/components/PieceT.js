import * as THREE from '../../build/three.module.js';
import Block from './Block.js'



export default class PieceT {
    constructor(scene) {
        
        this.cubeA = new Block(scene, 0,6,0);
        this.cubeB = new Block(scene, 0,7,0);
        this.cubeC = new Block(scene, 0,8,0);
        this.cubeD = new Block(scene, 1,7,0);        
        

        this.speed = 0.01;

        this.currentRotation = 0;

        this.rotations = {
            A : [
                    { x: -1, y: 1},
                    { x: 1, y: 1},
                    { x: 1, y: -1},
                    { x: -1, y: -1},
                ],
            B : [
                    { x: 0, y: 0},
                    { x: 0, y: 0},
                    { x: 0, y: 0},
                    { x: 0, y: 0},
                ],
            C : [
                    { x: 1, y: -1},
                    { x: -1, y: -1},
                    { x: -1, y: 1},
                    { x: 1, y: 1},
                ],
            D : [
                    { x: -1, y: -1},
                    { x: -1, y: 1},
                    { x: 1, y: 1},
                    { x: 1, y: -1},
                ],
        };

    }

    fall() {

        if (this.getMinY() > 0.5) {
            this.cubeA.cube.position.y -= this.speed;
            this.cubeB.cube.position.y -= this.speed;
            this.cubeC.cube.position.y -= this.speed;
            this.cubeD.cube.position.y -= this.speed;
        }

    }

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

    }

    moveLeft() {
        this.cubeA.cube.position.x -= 1;
        this.cubeB.cube.position.x -= 1;
        this.cubeC.cube.position.x -= 1;
        this.cubeD.cube.position.x -= 1;
    }

    moveRight() {
        this.cubeA.cube.position.x += 1;
        this.cubeB.cube.position.x += 1;
        this.cubeC.cube.position.x += 1;
        this.cubeD.cube.position.x += 1;
    }

    getMinY() {
        return Math.min(this.cubeA.cube.position.y, this.cubeB.cube.position.y, this.cubeC.cube.position.y, this.cubeD.cube.position.y)
    }

}
