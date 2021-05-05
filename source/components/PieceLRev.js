import * as THREE from '../../build/three.module.js';
import Block from './Block.js';
import BasicPiece from './BasicPiece.js';



export default class PieceLRev extends BasicPiece {
    constructor(scene) {
        super();

        this.cubeA = new Block(scene, 4, 20, 0);
        this.cubeB = new Block(scene, 4, 19, 0);
        this.cubeC = new Block(scene, 5, 19, 0);
        this.cubeD = new Block(scene, 6, 19, 0);
        this.cubeArray = [this.cubeA, this.cubeB, this.cubeC, this.cubeD];


        this.rotations = {
            A: [
                {
                    x: 2,
                    y: 0
                },
                {
                    x: 0,
                    y: -2
                },
                {
                    x: -2,
                    y: 0
                },
                {
                    x: 0,
                    y: 2
                },
                ],
            B: [
                {
                    x: 1,
                    y: 1
                },
                {
                    x: 1,
                    y: -1
                },
                {
                    x: -1,
                    y: -1
                },
                {
                    x: -1,
                    y: 1
                },
                ],
            C: [
                {
                    x: 0,
                    y: 0
                },
                {
                    x: 0,
                    y: 0
                },
                {
                    x: 0,
                    y: 0
                },
                {
                    x: 0,
                    y: 0
                },
                ],
            D: [
                {
                    x: -1,
                    y: -1
                },
                {
                    x: -1,
                    y: 1
                },
                {
                    x: 1,
                    y: 1
                },
                {
                    x: 1,
                    y: -1
                },
                ],
        };


    }

}
