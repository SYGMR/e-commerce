import React, {useState, useRef, useEffect, useMemo, Suspense} from 'react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useFrame, useLoader, Dom} from "react-three-fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import {useSpring, a} from 'react-spring/three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import * as THREE from "three";
import { RGBA_ASTC_10x10_Format, Vector3 } from 'three';

extend({ OrbitControls, UnrealBloomPass, EffectComposer, RenderPass })

var hover = false;

export function System() {
	const ref = useRef()
	useFrame(() => (ref.current.rotation.y += 0.002))
	const texture = new THREE.TextureLoader().load('/img/2k_sun.jpg');
	return (
		<mesh ref={ref} position={[0, 1, 0]} rotation-y={Math.PI / 2}>
			<sphereGeometry attach="geometry" args={[100,100,100]} />
			<meshBasicMaterial attach="material" map={texture} />
		</mesh>
	)
}

export function PivotSphere() {
	const ref = useRef()
	useFrame(() => { if(hover === false) 
				{ref.current.rotation.z += 0.002}
			})
	return (
		<group>		
			<mesh ref={ref} position={[0, 1, 0]} rotation-x={Math.PI / 2}>
				

				<planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
				{[
					{ name: "Shop 1", position: [400, 1, 40], "rotation-z": Math.PI / 2 },
					{ name: "Shop 2", position: [2, 300, 40], "rotation-z": Math.PI / 2 },
					{ name: "Shop 3", position: [30, -400, 40], "rotation-z": Math.PI / 2 },
					{ name: "Shop 4", position: [-300, 0, 40], "rotation-z": Math.PI / 2 },
					{ name: "Shop 5", position: [200, 200, 40], "rotation-z": Math.PI / 2 },
				].map(props => (
					<SolarSystem {...props} />
				))}
			</mesh>
		</group>
	)
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  } 


export function SolarSystem(props) {

	var texturesList = [
		'/img/planetTexture/2k_jupiter.jpg',
		'.img/planetTexture/2k_mars.jpg',
		'/img/planetTexture/2k_saturn.jpg',
		'/img/planetTexture/2k_venus_atmosphere.jpg',
		'/img/planetTexture/2k_mercury.jpg'

	];
	var randIndex = getRandomInt(0, texturesList.length - 1);

	var randTexture = new THREE.TextureLoader().load(texturesList[randIndex]);
	console.log(randTexture)
	const dom = useRef()
	return (
		<mesh rotation-y={Math.PI / 2} onPointerOver ={e => hover = true }
										onPointerOut = {e => hover = false}
			{...props}
		>
			<sphereGeometry attach="geometry" args={[getRandomInt(20,40), 20, 30]} />
			<meshLambertMaterial attach="material" map ={randTexture} />
		</mesh>
	)
}
const  Effect = () =>{
	const composer = useRef();
	const { scene, gl, size, camera } = useThree()
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)
  return(

	<effectComposer ref={composer} args={[gl]}>
			<renderPass attachArray="passes" scene={scene} camera={camera} />
			<unrealBloomPass attachArray="passes" args={[aspect, 0.4, 0, 0.1]} />
	</effectComposer>
  )
}


const Controls = () => {
	const orbitRef = useRef()
	const { camera, gl } = useThree()
  
	useFrame(() => {
	  orbitRef.current.update()
	})
  
	return (
	  <orbitControls
	  	enableRotate={false}
		enablePan={false}
		target = {[0,0,0]}
		args={[camera, gl.domElement]}
		ref={orbitRef}
	  />
	)
  }

export default function() {

	
	return (
		<Canvas
			style={{ backgroundImage: 'url(/img/space.jpg)'}}
			camera={{ position: [0,500,1000 ],fov: 50, near: 100, far: 5000}}
		>
			<pointLight position={[1,1,1]}/>
			<ambientLight intensity={0.2}/>
			<System/>
			<PivotSphere />
			<Controls />
			<Effect />
		</Canvas>
	)
}