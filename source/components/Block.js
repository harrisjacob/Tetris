import * as THREE from '../../build/three.module.js';

export default class Block {
	
	constructor(scene, x, y, z) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial()
        material.color = new THREE.Color(0xff0000);

        if (x == 1){
        	material.color = new THREE.Color(0x0000ff);
        }


        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.x = x;
        this.cube.position.y = y;
        this.cube.position.z = z;
        this.cube.castShadow = true;

        scene.add(this.cube);
    }

}