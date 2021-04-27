import * as THREE from '../build/three.module.js';

import {
    OrbitControls
} from './jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let speed = 1;
var rotateCount = 0;
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

    //
    //    //Box Geometry
    //    const geometry = new THREE.BoxGeometry(1, 1, 1);
    //    const material = new THREE.MeshPhongMaterial()
    //    material.color = new THREE.Color(0xff0000);
    //
    //    const material1 = new THREE.MeshPhongMaterial()
    //    material1.color = new THREE.Color(0x100022);
    //
    //    cubeA = new THREE.Mesh(geometry, material1);
    //    cubeA.castShadow = true;
    //    cubeA.position.x = 0;
    //    cubeA.position.y = 6;
    //    cubeA.position.z = 0;
    //
    //    cubeB = new THREE.Mesh(geometry, material);
    //    cubeB.castShadow = true;
    //    cubeB.position.x = 0;
    //    cubeB.position.y = 7;
    //    cubeB.position.z = 0;
    //
    //    cubeC = new THREE.Mesh(geometry, material);
    //    cubeC.castShadow = true;
    //    cubeC.position.x = 0;
    //    cubeC.position.y = 8;
    //    cubeC.position.z = 0;
    //
    //    cubeD = new THREE.Mesh(geometry, material);
    //    cubeD.castShadow = true;
    //    cubeD.position.x = 1;
    //    cubeD.position.y = 7;
    //    cubeD.position.z = 0;
    //
    //    scene.add(cubeA);
    //    scene.add(cubeB);
    //    scene.add(cubeC);
    //    scene.add(cubeD);

    ladA = new LadA(scene);


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
    ladA.fall();
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
};

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') { // left arrow
        ladA.moveLeft();
    } else if (e.keyCode == '39') { // right arrow
        ladA.moveRight();
    } else if (e.keyCode == '32') { //space bar

        rotateCount += 1;
        //var pp, var pm, var mp, var mm
        switch (rotateCount) {
            case 1:
                ladA.rotate1();
                break;
            case 2:
                ladA.rotate2();
                break;
            case 3:
                ladA.rotate3();
                break;
            case 4:
                ladA.rotate4();
                rotateCount = 0;
                break;
            default:
                break;
        }
    }

}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

class LadA {
    constructor(scene) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial()
        material.color = new THREE.Color(0xff0000);


        this.cubeA = new THREE.Mesh(geometry, material);
        this.cubeA.castShadow = true;
        this.cubeA.position.x = 0;
        this.cubeA.position.y = 6;
        this.cubeA.position.z = 0;

        this.cubeB = new THREE.Mesh(geometry, material);
        this.cubeB.castShadow = true;
        this.cubeB.position.x = 0;
        this.cubeB.position.y = 7;
        this.cubeB.position.z = 0;

        this.cubeC = new THREE.Mesh(geometry, material);
        this.cubeC.castShadow = true;
        this.cubeC.position.x = 0;
        this.cubeC.position.y = 8;
        this.cubeC.position.z = 0;

        this.cubeD = new THREE.Mesh(geometry, material);
        this.cubeD.castShadow = true;
        this.cubeD.position.x = 1;
        this.cubeD.position.y = 7;
        this.cubeD.position.z = 0;

        this.speed = 0.01;

        scene.add(this.cubeA);
        scene.add(this.cubeB);
        scene.add(this.cubeC);
        scene.add(this.cubeD);

    }

    fall() {

        if (this.getMinY() > 0.5) {
            this.cubeA.position.y -= this.speed;
            this.cubeB.position.y -= this.speed;
            this.cubeC.position.y -= this.speed;
            this.cubeD.position.y -= this.speed;
        }

    }


    rotate1() {
        this.cubeA.position.x -= 1;
        this.cubeA.position.y += 1;

        this.cubeC.position.x += 1;
        this.cubeC.position.y -= 1;

        this.cubeD.position.x -= 1;
        this.cubeD.position.y -= 1;

    }

    rotate2() {
        this.cubeA.position.x += 1;
        this.cubeA.position.y += 1;

        this.cubeD.position.x -= 1;
        this.cubeD.position.y += 1;

        this.cubeC.position.x -= 1;
        this.cubeC.position.y -= 1;

    }

    rotate3() {
        this.cubeA.position.x += 1;
        this.cubeA.position.y -= 1;

        this.cubeC.position.x -= 1;
        this.cubeC.position.y += 1;

        this.cubeD.position.x += 1;
        this.cubeD.position.y += 1;

    }

    rotate4() {
        this.cubeA.position.x -= 1;
        this.cubeA.position.y -= 1;

        this.cubeC.position.x += 1;
        this.cubeC.position.y += 1;

        this.cubeD.position.x += 1;
        this.cubeD.position.y -= 1;
    }

    moveLeft() {
        this.cubeA.position.x -= 1;
        this.cubeB.position.x -= 1;
        this.cubeC.position.x -= 1;
        this.cubeD.position.x -= 1;
    }

    moveRight() {
        this.cubeA.position.x += 1;
        this.cubeB.position.x += 1;
        this.cubeC.position.x += 1;
        this.cubeD.position.x += 1;
    }

    getMinY() {

        return Math.min(this.cubeA.position.y, this.cubeB.position.y, this.cubeC.position.y, this.cubeD.position.y)
    }




}
