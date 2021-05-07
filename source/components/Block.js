import * as THREE from '../../build/three.module.js';

export default class Block {
	
	constructor(scene, x, y, z, color) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial()
        material.color = color;

        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.x = x;
        this.cube.position.y = y;
        this.cube.position.z = z;
        this.cube.castShadow = true;

        scene.add(this.cube);
    }

}