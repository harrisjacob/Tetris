import * as THREE from '../../build/three.module.js';

export default class Block {
	
	constructor(scene, x, y, z, color) {
        const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        geometry.clearGroups();
        geometry.addGroup( 0, Infinity, 0 );
        geometry.addGroup( 0, Infinity, 1 );


        const loader = new THREE.TextureLoader();

        const material0 = new THREE.MeshBasicMaterial({
            color: color,
        });
        
        const material1 = new THREE.MeshBasicMaterial({
            map: loader.load('./textures/outline.png' ),
            transparent: true,
        });


        var materials = [material0, material1];

        this.cube = new THREE.Mesh(geometry, materials);
        this.cube.position.x = x;
        this.cube.position.y = y;
        this.cube.position.z = z;
        this.cube.castShadow = true;
        this.cube.recieveShadow = true;
        scene.add(this.cube);
    }

}