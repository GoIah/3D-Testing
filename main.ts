import * as THREE from 'three';
import { lerp } from 'three/src/math/MathUtils.js';

const width = window.innerWidth, height = window.innerHeight;
// init

const camera: THREE.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const CarMesh: THREE.Mesh = new THREE.Mesh( new THREE.BoxGeometry( 1, 0.35, 2 ), new THREE.MeshBasicMaterial() );
CarMesh.position.set(0, 0.35/2, 0);
CarMesh.material.color.setRGB(0.95,0.15,0.15);
scene.add( CarMesh );

const BasePlate: THREE.Mesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 0.2, 100 ), new THREE.MeshBasicMaterial() );
BasePlate.position.set(0,0,0);
BasePlate.material.color.setRGB(0.35, 1, 0.45);
scene.add( BasePlate );

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer( { antialias: false } );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.basicShadowMap;
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

const txt: HTMLElement | null = document.getElementById("data");

function AppendDebug( append_to: string ) {
	if (txt != null) { txt.innerHTML += (append_to+"\n"); }
}

const CO = {
	[0]: {
		["CamP"]: new THREE.Vector3(1,1,5),
		["CamR"]: new THREE.Vector3(0,0,0)
	},
	[1]: {
		["CamP"]: new THREE.Vector3(-1,1,5),
		["CamR"]: new THREE.Vector3(0,0,0)
	}
}

function LerpVec3(vec, dvec, t) {
	return new THREE.Vector3(
		lerp(vec.x, dvec.x, t),
		lerp(vec.y, dvec.y, t),
		lerp(vec.z, dvec.z, t),
	)
}

function SetPosFromVec3(obj, position, rotation) {
	obj.position.x = position.x;
	obj.position.y = position.y;
	obj.position.z = position.z;

	obj.rotation.x = rotation.x;
	obj.rotation.y = rotation.x;
	obj.rotation.z = rotation.x;
}

function LerpObject(obj, position, rotation, endposition, endrotatio, t) {
	const PosFR = LerpVec3(position, endposition, t)
	const RotFR = LerpVec3(rotation, endrotatio, t)

	SetPosFromVec3(obj, PosFR, RotFR)
}

var scale = 0;

SetPosFromVec3(camera , CO[0].CamP, CO[0].CamR);

function animate( t: number ) {
	if (txt != null) { txt.innerHTML = ""; }

	scale = (Math.sin(t/1000)/2)+(1/2);

	LerpObject(camera, CO[0].CamP, CO[0].CamR,
		CO[1].CamP, CO[1].CamR, scale);


	AppendDebug((scale).toString());

	renderer.render( scene, camera );
}