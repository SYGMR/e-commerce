import React, {useState, useRef, useMemo, Suspense} from 'react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useFrame, useLoader, Dom} from "react-three-fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import {useSpring, a} from 'react-spring/three'
import * as THREE from "three";
import lerp from "lerp";


function Galaxy() {
	const ref = useRef()
	useFrame(() => (ref.current.rotation.z += 0.001))
	const texture = new THREE.TextureLoader().load('/img/galaxy2.png');
	// const texture = useLoader(THREE.TextureLoader, galaxyImg)
	return (
		<mesh ref={ref} position={[0, 1, 0]} rotation-x={Math.PI / 2}>
			<planeBufferGeometry attach="geometry" args={[1500, 1500, 1]} />
			<meshBasicMaterial side={THREE.BackSide} transparent opacity={0.8} attach="material" map={texture} />
		</mesh>
	)
}

function Stars() {  // TODO
	return (
		<>
			<SpiralGalaxy iteration={8} t={0} floatSpread={0.5} distanceFactor={1000} color={0xffffff} />
			<SpiralGalaxy iteration={12} t={16} floatSpread={10} distanceFactor={1500} color="#51fcff" /> // TODO
			<SpiralGalaxy iteration={8} t={8} floatSpread={0.5} distanceFactor={500} color={0xffffff} />
		</>
	)
}

function SpiralGalaxy(props) {
	let t = props.t
	const ref = useRef()
	useFrame(() => (ref.current.rotation.y -= 0.001))
	const { iteration, floatSpread, distanceFactor, color } = props
	const positions = useMemo(() => {
		let positions = []
		for (let y = 0; y < iteration; y++) {
			t++
			for (let i = 0; i < 1000; i++) {
				const norm = i / 1000;
				const theta = norm * Math.PI + t + THREE.Math.randFloatSpread(floatSpread);
				const phi = THREE.Math.randFloatSpread(0.15)
				const distance = norm * distanceFactor;
				positions.push(distance * Math.sin(theta) * Math.cos(phi))
				positions.push(distance * Math.sin(theta) * Math.sin(phi))
				positions.push(distance * Math.cos(theta))
			}
		}
		return new Float32Array(positions)
	}, [iteration, floatSpread, t, distanceFactor])
	return (
		<points ref={ref}>
			<bufferGeometry attach="geometry">
				<bufferAttribute
					attachObject={['attributes', 'position']}
					array={positions}
					count={positions.length / 3}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial attach="material" color={color} />
		</points>
	)
}

function PivotSphere(props) {
	const ref = useRef()
	const dom = useRef()
	useFrame(() => (ref.current.rotation.z += 0.001))
	return (
		<group>		
			<mesh ref={ref} position={[0, 1, 0]} rotation-x={Math.PI / 2}>
				<planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
				// TODO Position should be relative and only updated when pointer is over
				<Dom ref={dom} style={{ color: 'white', display: "none" }}> 
					<h2 style={{ opacity: 0.8 }}>{props.name}</h2>
				</Dom>
				{[
					{ name: "Category 1", position: [400, 1, -5], "rotation-z": Math.PI / 2 },
					{ name: "Category 2", position: [2, 300, -5], "rotation-z": Math.PI / 2 },
					{ name: "Category 3", position: [30, -400, -5], "rotation-z": Math.PI / 3 },
					{ name: "Category 4", position: [-300, 0, -5], "rotation-z": Math.PI / 4 },
					{ name: "Category 5", position: [200, 200, -5], "rotation-z": Math.PI / 5 },
				].map(props => (
					<SolarSystem {...props} />
				))}
			</mesh>
		</group>
	)
}


function SolarSystem(props) {
	const ref = useRef()
	let move = false
	let position = new THREE.Vector3();
	const { camera } = useThree()
	// const [texture] = useLoader(THREE.TextureLoader, [flareImg])
	const texture = new THREE.TextureLoader().load('/img/flare.png');
	const dom = useRef()
	useFrame(() => {
		if(move === true) {
			camera.position.x = lerp(camera.position.x, position.x, 0.08)
			camera.position.y = lerp(camera.position.y, position.y, 0.08)
			camera.position.z = lerp(camera.position.z, position.z, 0.08 )
			// camera.fov = lerp(camera.fov, 0, 0.08 )

			camera.updateProjectionMatrix()
		}
	})
	// const ref = useRef();
	return (
		<mesh	
			ref={ref}
			{...props}
			onPointerOver={e => {

			}}
			onClick={e => {
				position.setFromMatrixPosition(ref.current.matrixWorld);
				console.log(position)

				move = true
				// console.log(props.name)
			}} // TODO Show tooltip
		>
			<planeBufferGeometry attach="geometry" args={[70, 70, 30]} />
			<meshBasicMaterial side={THREE.BackSide} depthTest={false} transparent attach="material" map={texture} />
			<Dom>
				<div class="content">
				{props.name}
				</div>
			</Dom>
		</mesh>
	)
}

function Fallback() {
	return (
		<Dom>
    		<div class="loading">Loading...</div>
  		</Dom>
	)
}


const Startup = () => {
	const { camera } = useThree()
	const ref = useRef()
	// Zooms the cam from 100 to 7. Since it's inside the Suspense boundary, it will
	// start doing that once everything's loaded/processed :]
	useFrame(() => {
	ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 1)
	  camera.position.x = lerp(camera.position.x, -200, 0.08)
	  camera.position.y = lerp(camera.position.y, 400, 0.08)
	  camera.position.z = lerp(camera.position.z, 1000, 0.08 )
	  camera.updateProjectionMatrix()
	})
	return (
	  <mesh ref={ref} position={ [-200, 400, 1000]} scale={[100, 100, 1]}>
		<planeBufferGeometry attach="geometry" />
		<meshBasicMaterial attach="material" color="#0e0e0f" transparent opacity={1} />
	  </mesh>
	)
  }

export default function() {
	return (
		<Canvas
			style={{ backgroundColor: 'black', backgroundImage: 'url(/img/space.jpg)'}}
			// camera={{ position: [-200, 400, 1000], rotation: [-0.5, -0.2, -0.6], fov: 50, near: 100, far: 5000}}
			camera={{ position: [-1000, 2000, 5000],  rotation: [-0.5, -0.2, -0.6], fov: 50, near: 10, far: 10000}}
		>
			<Suspense fallback={<Fallback />}>
				<Galaxy />	
				<Stars />
				<PivotSphere />
				<Startup />	
			</Suspense>
		</Canvas>
	)
}