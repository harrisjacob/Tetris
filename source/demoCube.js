import * as THREE from '../build/three.module.js';

import {
    OrbitControls
} from './jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let speed = 1;
var cube;

window.onload = function init() {


    const container = document.getElementById('container');

    //Set up camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(3, 2, 16); // obj.position.set is for moving obj around the scene.  Not related to the camera specifically


    //Set up Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    //scene.fog = new THREE.Fog( 0xa0a0a0, 2, 20 );


    //Lighting
    const hemiLight = new THREE.HemisphereLight(0xff0000, 0x000000); //params: Sky color, ground color, [intensity = 1.0]
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(6, 10, 3);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = -1;
    dirLight.shadow.camera.left = -1;
    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 20;
    scene.add(dirLight);


    //Plane Geometry
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshPhongMaterial({
        color: 0x999999,
        depthWrite: false
    }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(50, 50, 0x888888, 0x888888);
    scene.add(grid);


    //Box Geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial()
    material.color = new THREE.Color(0xff0000);
    cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 6;
    cube.position.z = 0;

    scene.add(cube);




    //Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    //Trackball
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.1, 0);
    controls.update();
    //controls.minDistance = 0.5;
    //controls.maxDistance = 10;
    controls.maxPolarAngle = 0.5 * Math.PI;

    //Buttons
    document.getElementById("plus").onclick = function () {
        console.log(speed);
        speed += 0.01;
    };

    document.getElementById("minus").onclick = function () {
        console.log(speed);
        if (speed > 0.0001) {
            speed -= 0.01;
        }
    };

    //Arrow Keys
    document.onkeydown = checkKey;

    window.addEventListener('resize', onWindowResize);

    animate();
}

const animate = function () {

    if (cube.position.y > 0.5) {
        cube.position.y -= speed * 0.01;
    }
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
};

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
        cube.position.x -= 1;
    } else if (e.keyCode == '39') {
        cube.position.x += 1;
    }

}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
