import * as THREE from '../../build/three.module.js';
import Block from './Block.js';
import BasicPiece from './BasicPiece.js';



export default class PieceZ extends BasicPiece {
    constructor(scene) {
        super();

        let color = new THREE.Color(0xff0000);

        this.cubeA = new Block(scene, 4, 20, 0, color);
        this.cubeB = new Block(scene, 5, 20, 0, color);
        this.cubeC = new Block(scene, 5, 19, 0, color);
        this.cubeD = new Block(scene, 6, 19, 0, color);
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
                {
                    x: 1,
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
