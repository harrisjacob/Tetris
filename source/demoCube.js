import * as THREE from '../build/three.module.js';

import {
    OrbitControls
} from './jsm/controls/OrbitControls.js';

//Game Pieces
import PieceI from './components/PieceI.js';
import PieceL from './components/PieceL.js';
import PieceLRev from './components/PieceLRev.js';
import PieceO from './components/PieceO.js';
import PieceT from './components/PieceT.js';
import PieceZ from './components/PieceZ.js';
import PieceZRev from './components/PieceZRev.js';



let scene, camera, renderer;
let speed = 1;
let ladA;

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



    ladA = new PieceZRev(scene);


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
    controls.maxPolarAngle = 0.5 * Math.PI;

    //Buttons
    document.getElementById("plus").onclick = function () {
        ladA.speed += 0.01;
    };

    document.getElementById("minus").onclick = function () {
        console.log(speed);
        if (speed > 0.0001) {
            ladA.speed -= 0.01;
        }
    };

    //Arrow Keys
    document.onkeydown = checkKey;

    window.addEventListener('resize', onWindowResize);

    animate();
}

const animate = function () {
    e333333333333333ê334rrr444fffffffrrrrrrrr
    ladA.fall();
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
};

function checkKey(e) {
    e = e || window.event;

    if (ladA.getMinY() > 0.5) {
        if (e.keyCode == '37') { // left arrow
            ladA.moveLeft();
        } else if (e.keyCode == '39') { // right arrow
            ladA.moveRight();
        } else if (e.keyCode == '32') { //space bar
            ladA.rotate();
        }
    }
}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
