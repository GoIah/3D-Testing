import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

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

	camera.position.x += Math.sin(time) / 20;

	camera.lookAt(mesh.position);

	renderer.render( scene, camera );
	
	AppendDebug("a");
	AppendDebug("b");
}