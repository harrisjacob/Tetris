import * as THREE from '../../build/three.module.js';
import Block from './Block.js';
import BasicPiece from './BasicPiece.js';



export default class PieceT extends BasicPiece{
    constructor(scene) {  
        super();
        
        this.cubeA = new Block(scene, 0,6,0);
        this.cubeB = new Block(scene, 0,7,0);
        this.cubeC = new Block(scene, 0,8,0);
        this.cubeD = new Block(scene, 1,7,0);        

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

}
