import * as THREE from '../../build/three.module.js';
import Block from './Block.js';


export default class Board {

	constructor(scene){
		const boardWidth = 10;
		const boardHeight = 20;

		var baseRow = new Array();
		var leftWall = new Array();
		var rightWall = new Array();
		let color = new THREE.Color(0xffffff);


		var i;
		for(i=0;i<boardWidth;i++){
			baseRow[i] = new Block(scene, i, -1, 0, color);
		}

		for(i=-1;i<boardHeight;i++){
			leftWall[i] = new Block(scene, -1, i, 0, color);
			rightWall[i] = new Block(scene, boardWidth, i, 0, color);

		}



	};




};