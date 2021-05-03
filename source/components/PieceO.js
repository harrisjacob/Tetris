import * as THREE from '../../build/three.module.js';
import Block from './Block.js';
import BasicPiece from './BasicPiece.js';



export default class PieceO extends BasicPiece{
    constructor(scene) {  
        super();
        
        this.cubeA = new Block(scene, 0,8,0);
        this.cubeB = new Block(scene, 0,7,0);
        this.cubeC = new Block(scene, 1,8,0);
        this.cubeD = new Block(scene, 1,7,0);        

        this.rotations = {
            A : [ { x: 0, y: 0}, ],
            B : [ { x: 0, y: 0}, ],
            C : [ { x: 0, y: 0}, ],
            D : [ { x: 0, y: 0}, ],
        };


    }

}
