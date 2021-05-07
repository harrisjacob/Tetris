import * as THREE from '../../build/three.module.js';
import Block from './Block.js';
import BasicPiece from './BasicPiece.js';



export default class PieceT extends BasicPiece {
    constructor(scene) {
        super();

        let color = new THREE.Color(0x9900ff);

        this.cubeA = new Block(scene, 4, 19, 0, color);
        this.cubeB = new Block(scene, 5, 19, 0, color);
        this.cubeC = new Block(scene, 6, 19, 0, color);
        this.cubeD = new Block(scene, 5, 20, 0, color);
        this.cubeArray = [this.cubeA, this.cubeB, this.cubeC, this.cubeD];


        this.rotations = {
            A: [
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
            B: [
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
            C: [
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
            D: [
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
        };

    }

}
