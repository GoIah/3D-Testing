import * as THREE from 'three';
import { Color, color, Mesh } from 'three/webgpu';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const CarMesh = new THREE.Mesh( new THREE.BoxGeometry( 1, 0.45, 2 ), new THREE.MeshBasicMaterial() );
CarMesh.position.set(0, 0.45/2, 0);
CarMesh.material.color.setRGB(1,0,0);
scene.add( CarMesh );

const BasePlate = new THREE.Mesh( new THREE.BoxGeometry( 100, 0.2, 100 ), new THREE.MeshBasicMaterial() );
BasePlate.position.set(0,0,0);
BasePlate.material.color.setRGB(1, 1, 1);
scene.add( BasePlate );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

const txt = document.getElementById("data")

function AppendDebug(appendto) {
	txt.innerHTML += (appendto+"\n");
}

function animate( time ) {
	txt.innerHTML = "";

	camera.position.x = 0.45;
	camera.position.y = 0.2;
	camera.position.z = 1.6;

	camera.rotation.x = 0.25;
	camera.rotation.y = 0.45;
	camera.rotation.z = 0.25;

	renderer.render( scene, camera );
}