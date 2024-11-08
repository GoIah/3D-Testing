import * as THREE from 'three';
import { Color, color, Mesh } from 'three/webgpu';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshBasicMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const mesh1 = new THREE.Mesh( geometry, material );
scene.add( mesh1 );

const mesh2 = new THREE.Mesh( geometry, material );
scene.add( mesh2 );

const PlaneGeo = new THREE.BoxGeometry( 25, 0.1, 25 );
const Plane = new THREE.Mesh( PlaneGeo, material );
scene.add( Plane );

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
	Plane.position.y = -0.1;

	var YStretch = 1;
	var XSnap = 0.0035;

	var sin = Math.sin(time*XSnap)*YStretch
	var cos = Math.cos(time*XSnap)*YStretch

	Plane.color.sethe
	camera.position.y = 2;

	mesh.position.z = sin;
	mesh.position.x = cos;
	
	mesh1.position.x = sin;
	mesh2.position.z = cos;

	camera.lookAt(new THREE.Vector3(0,-100,0));
	
	AppendDebug("Sin: "+sin);
	AppendDebug("Cos: "+cos);

	renderer.render( scene, camera );
}