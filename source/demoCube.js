import * as THREE from '../build/three.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';

let scene, camera, renderer;

window.onload = function init() {


	const container = document.getElementById( 'container' );

	//Set up camera
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
	camera.position.set( 3, 2, 16 );

	//Set up Scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xa0a0a0 );
	//scene.fog = new THREE.Fog( 0xa0a0a0, 2, 20 );


	//Lighting
	const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
	hemiLight.position.set( 0, 20, 0 );
	scene.add( hemiLight );

	const dirLight = new THREE.DirectionalLight( 0xffffff );
	dirLight.position.set( 5, 5, 0 );
	dirLight.castShadow = true;
	dirLight.shadow.camera.top = 1;
	dirLight.shadow.camera.bottom = - 1;
	dirLight.shadow.camera.left = - 1;
	dirLight.shadow.camera.right = 1;
	dirLight.shadow.camera.near = 0.1;
	dirLight.shadow.camera.far = 20;
	scene.add( dirLight );


	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );



	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	container.appendChild( renderer.domElement );

	//

	const controls = new OrbitControls( camera, renderer.domElement );
	controls.target.set( 0, 0.1, 0 );
	controls.update();
	controls.minDistance = 0.5;
	controls.maxDistance = 10;
	controls.maxPolarAngle = 0.5 * Math.PI;

	//

	window.addEventListener( 'resize', onWindowResize );

	animate();
}

const animate = function () {

	requestAnimationFrame( animate )
	renderer.render( scene, camera );
};

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
