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
let pause = 500;
var ladA;


var board_positions = [];
var broken_rows;

function createBlock() {
    //    //Box Geometry
    //    const geometry = new THREE.BoxGeometry(1, 1, 1);
    //    const material = new THREE.MeshPhongMaterial()
    //    material.color = new THREE.Color(0xff0000);
    switch(Math.floor(Math.random() * 7)) {
        case 0:
            ladA = new PieceI(scene);
            break;
        case 1:
            ladA = new PieceL(scene);
            break;
        case 2:
            ladA = new PieceLRev(scene);
            break;
        case 3:
            ladA = new PieceO(scene);
            break;
        case 4:
            ladA = new PieceT(scene);
            break;
        case 5:
            ladA = new PieceZ(scene);
            break;
        case 6:
            ladA = new PieceZRev(scene);
            break;
    }
            


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
    ground.position.y = -0.5
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(50, 50, 0x888888, 0x888888);
    grid.position.y = -0.5;
    scene.add(grid);

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
    controls.maxPolarAngle = 0.5 * Math.PI;

       //Buttons
       document.getElementById("plus").onclick = function () {
            if (pause > 200) {
                pause -= 200;
            }
       };
    
       document.getElementById("minus").onclick = function () {
            if (pause < 1200) {
                pause += 200;
            }
       };

    // Initialize board positions
    board_positions = (new Array(20)).fill().map(function () {
        return new Array(10).fill(0);
    });

    //Arrow Keys
    document.onkeydown = checkKey;
    // window.addEventListener('click', doRender);

    window.addEventListener('resize', onWindowResize);

    animate();
}

// Check if any row is full
function breakRows() {
    broken_rows = 0;
    let bottom_broken_row = null;
    for (var i = 0; i < board_positions.length; i++) {
        if (!board_positions[i].includes(0)) {
            broken_rows++;
            // Delete full row and add empty row at the top
            for (var j = 0; j < board_positions[i].length; j++) {
                var to_delete = board_positions[i][j]
                scene.remove(to_delete);
                to_delete.geometry.dispose();
                to_delete.material.dispose();
                bottom_broken_row = i;
            }
            board_positions.splice(i, 1);
            // TODO: Add to the score for the broken row
            document.getElementById("score").innerHTML = "Score: " + (parseInt(document.getElementById("score").title) + 1).toString();
            document.getElementById("score").title = (parseInt(document.getElementById("score").title) + 1).toString();
            board_positions.unshift(new Array(10).fill(0));
        }
    }
    // Move the rows above the broken ones down
    if (broken_rows > 0) {
        for (var i = 0; i <= bottom_broken_row; i++) {
            for (var j = 0; j < board_positions[i].length; j++) {                
                if (board_positions[i][j] != 0) {
                    board_positions[i][j].position.y -= broken_rows;
                }
            }
        }
    }
}

// Check if the block can move down or needs to stop
function checkDescent() {
    var row = 19 - (ladA.getMinY());
    let col;

    if (row < 19) {
        var shouldStop = false
        // Stop the block from falling if it should be stacked
        for (var i in ladA.cubeArray) {
            let cube = ladA.cubeArray[i];
            row = 19 - cube.cube.position.y;
            col = cube.cube.position.x;
            if (board_positions[row + 1][col] != 0 && !ladA.cubeArray.includes(board_positions[row + 1][col])) {
                shouldStop = true;
            }
        }
        if (!shouldStop) {
            
            ladA.dropOne();
        } else {
            let a_y = 19 - ladA.cubeA.cube.position.y;
            let b_y = 19 - ladA.cubeB.cube.position.y;
            let c_y = 19 - ladA.cubeC.cube.position.y;
            let d_y = 19 - ladA.cubeD.cube.position.y
            // Ends the game if the blocks are stacked too high
            // TODO : stop the animation, display game over screen?
            if(a_y < 0 || b_y < 0 || c_y < 0 || d_y < 0){
                console.log("GAME OVER");
                pause = 1000000;
            } else {
                board_positions[a_y][ladA.cubeA.cube.position.x] = ladA.cubeA.cube;
                board_positions[b_y][ladA.cubeB.cube.position.x] = ladA.cubeB.cube;
                board_positions[c_y][ladA.cubeC.cube.position.x] = ladA.cubeC.cube;
                board_positions[d_y][ladA.cubeD.cube.position.x] = ladA.cubeD.cube;

                breakRows();
                createBlock();
            }
        }
    } else {
        // 2D position matrix starts with row 0 at the top, but real cube y position has 0 at plane level
        // So, subtract 19 to convert
        board_positions[19 - ladA.cubeA.cube.position.y][ladA.cubeA.cube.position.x] = ladA.cubeA.cube;
        board_positions[19 - ladA.cubeB.cube.position.y][ladA.cubeB.cube.position.x] = ladA.cubeB.cube;
        board_positions[19 - ladA.cubeC.cube.position.y][ladA.cubeC.cube.position.x] = ladA.cubeC.cube;
        board_positions[19 - ladA.cubeD.cube.position.y][ladA.cubeD.cube.position.x] = ladA.cubeD.cube;

        breakRows();
        createBlock();
    }
}

const animate = function () {

    checkDescent();

    // Pause between renders to make the boxes drop incrementally
    setTimeout(function () {
        requestAnimationFrame(animate);
    }, pause);
    breakRows();
    renderer.render(scene, camera);

};

function checkKey(e) {
    e = e || window.event;

    if (ladA.getMinY() > 0.5) {

        if (e.keyCode == '32') { //space bar
            ladA.rotate();
            renderer.render(scene, camera);
        }
        var row = 19 - (ladA.getMinY() - 0.5);
        let col;

        // Only move left or right if within the 10 block space, above the ground plane, and there are no blocks next to it
        if (e.keyCode == '37' && ladA.getLeftCol() >= 1) {
            let goLeft = true;
            for (var i in ladA.cubeArray) {
                let cube = ladA.cubeArray[i];
                row = 19 - cube.cube.position.y;
                col = cube.cube.position.x;
                if (board_positions[row][col - 1] != 0) {
                    goLeft = false;
                }
            }
            if(goLeft){
                ladA.moveLeft();
                renderer.render(scene, camera);
            }
        } else if (e.keyCode == '39' && ladA.getRightCol() < 9) {
            let goRight = true;
            for (var i in ladA.cubeArray) {
                let cube = ladA.cubeArray[i];
                row = 19 - cube.cube.position.y;
                col = cube.cube.position.x;
                if (board_positions[row][col + 1] != 0) {
                    goRight = false;
                }
            }
            if(goRight){
                ladA.moveRight();
                renderer.render(scene, camera);
            }
        } else if (e.keyCode == '40'){
            // Move block down faster
            checkDescent();
            renderer.render(scene, camera);
        }
    }
}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
