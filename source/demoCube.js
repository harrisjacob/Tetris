import * as THREE from '../build/three.module.js';

import {
    OrbitControls
} from './jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let speed = 1;
var cube;

var board_positions = [];
var broken_rows;

function createBlock(){
    //Box Geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial()
    material.color = new THREE.Color(0xff0000);
    cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.position.x = 4;
    cube.position.y = 6.5;
    cube.position.z = 0;

    scene.add(cube);
}

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


    // Create Block
    createBlock();

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
    const controls = new OrbitControls(camera, renderer.domElement, renderer, scene);
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

    // Initialize board positions
    board_positions = (new Array(20)).fill().map(function(){ return new Array(10).fill(0);});

    //Arrow Keys
    document.onkeydown = checkKey;
    // window.addEventListener('click', doRender);

    window.addEventListener('resize', onWindowResize);

    animate();
}

// Check if any row is full
function breakRows(){
    broken_rows = 0;
    for(var i=0; i<board_positions.length; i++){
        if(!board_positions[i].includes(0)){
            broken_rows++;
            // Delete full row and add empty row at the top
            for(var j=0; j<board_positions[i].length; j++){
                var to_delete = board_positions[i][j]
                scene.remove(to_delete);
                to_delete.geometry.dispose();
                to_delete.material.dispose();
            }
            board_positions.splice(i, 1);
            // TODO: Add to the score for the broken row
            // TODO: function call to delete the ith row of boxese visually from the scene
            board_positions.unshift(new Array(10).fill(0));
        }
    }
    if(broken_rows>0){
        for(var i=0; i<board_positions.length; i++){
            for(var j=0; j<board_positions[i].length; j++){
                if(board_positions[i][j] != 0){
                    board_positions[i][j].position.y -= broken_rows;
                }
            }
        }
    }
}

const animate = function () {

    var col = cube.position.x;
    var row = 19 - (cube.position.y - 0.5);
    
    if (cube.position.y > 0.5) {
        if(row < 19){
            // Stop the block from falling if it should be stacked
            if(board_positions[row+1][col] != 0){
                board_positions[row][col] = cube;
                breakRows();
                createBlock();
            } else {
                cube.position.y -= 1; 
            }
        } else {
            
            cube.position.y -= 1; 
        }
        // cube.position.y -= speed * 0.01;
    }
    else{
        // 2D position matrix starts with row 0 at the top, but real cube y position has 0 at plane level
        // So, subtract 19 to convert
        board_positions[row][col] = cube;
        console.log(board_positions);
        breakRows();
        console.log(broken_rows);
        createBlock();
    }

    // Pause between renders to make the boxes drop incrementally
    setTimeout(function(){
        requestAnimationFrame(animate);
    }, 500);
    renderer.render(scene, camera);
    
};

function checkKey(e) {

    e = e || window.event;
    var col = cube.position.x;
    var row = 19 - (cube.position.y - 0.5);
    // Only move left or right if within the 10 block space, above the ground plane, and there are no blocks next to it
    if (e.keyCode == '37' && cube.position.x >= 1 && cube.position.y > 0.5) {
        if(board_positions[row][col-1]==0){
            cube.position.x -= 1;
            renderer.render(scene, camera);
        }
    } else if (e.keyCode == '39' && cube.position.x < 9 && cube.position.y > 0.5 && board_positions[row][col]==0) {
        if(board_positions[row][col+1]==0){
            cube.position.x += 1;
            renderer.render(scene, camera);
        }
    }

}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
