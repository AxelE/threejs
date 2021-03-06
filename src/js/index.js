// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';
import { TweenLite, Circ } from 'gsap';

import fragment from '../shaders/sphere.fragment.glsl';
import vertex from '../shaders/sphere.vertex.glsl';

let camera, scene, renderer, geometry, material, mesh;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;


    let myUniforms = {
        color: {
            value: new THREE.Color("yellow")
        },
        light: {
            value: new THREE.Vector3(0.0, 1.0, 2.0)
        }
    }

    geometry = new THREE.SphereGeometry( 300, 32, 32 );
    material = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: myUniforms,
        vertexShader: vertex,
        fragmentShader: fragment
    });

    /*
    material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    */

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const clock = new THREE.Clock();
let first = true;
let myTween;
let back=false;
let objectSave;
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    mesh.rotation.x += 0.5 * delta;
    mesh.rotation.y += 0.7 * delta;

    raycaster.setFromCamera( mouse, camera );

    renderer.render(scene, camera);
}

function onMouseMove( event ) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
window.addEventListener( 'mousemove', onMouseMove, false );

// window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

init();
animate();