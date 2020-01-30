import React, { useState, useEffect, useRef, useMemo, Suspense, useContext,Link } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useFrame, useLoader, Dom } from "react-three-fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import { useSpring, a } from 'react-spring/three'
import * as THREE from "three";
import lerp from "lerp";

import { store, GalaxyProvider } from './GalaxyContext';

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

	const globalState = useContext(store);
	// useFrame(() => {
	// 	// const controls = new OrbitControls(camera, gl.domElement);
	// 	//boundingBox.setFromObject( object );
	// 	//let center = boundingBox.getCenter();
	// 	// controls.target = center;
	// 	camera.lookAt(position)
	// 	// position.setFromMatrixPosition(ref.current.matrixWorld);
	// 	// camera.position.x = lerp(camera.position.x,position.x, 0.08)
	// 	// camera.position.y = lerp(camera.position.y, position.y, 0.08)
	// 	// camera.position.z = lerp(camera.position.z, position.z, 0.08 )
	// 	// camera.fov = lerp(camera.fov, 0, 0.08 )
	// 	camera.updateProjectionMatrix()
	// })
	useFrame(() => (ref.current.rotation.z += 0.001))
	console.log(globalState.state.categories)
	return (
		<group>
			<mesh ref={ref} position={[0, 1, 0]} rotation-x={Math.PI / 2}>
				<planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
				{[
					{ name: globalState.state.categories[0].name, data: globalState.state.categories[0].id,  position: [400, 1, -50], "rotation-z": Math.PI / 2 },
					{ name: globalState.state.categories[1].name, data: globalState.state.categories[1].id, position: [2, 300, -50], "rotation-z": Math.PI / 2 },
					{ name: globalState.state.categories[2].name, data: globalState.state.categories[2].id, position: [30, -400, -50], "rotation-z": Math.PI / 3 },
					{ name: globalState.state.categories[3].name, data: globalState.state.categories[3].id, position: [-300, 0, -50], "rotation-z": Math.PI / 4 },
					{ name: globalState.state.categories[4].name, data: globalState.state.categories[4].id, position: [200, 200, -50], "rotation-z": Math.PI / 5 }
				].map(props => (<SolarSystem {...props} />))}
			</mesh>
		</group>
	)
}


function SolarSystem(props) {
	const globalState = useContext(store);
	const { dispatch } = globalState;
	const ref = useRef()
	const { camera } = useThree()
	//var box = new THREE.Box3()
	// const [texture] = useLoader(THREE.TextureLoader, [flareImg])
	const texture = new THREE.TextureLoader().load('/img/flare.png');
	// const ref = useRef();
	return (
		<mesh
			ref={ref}
			{...props}
			onPointerOver={e => {

			}}
			onClick={e => {
				// let position = new THREE.Vector3()
				globalState.state.position.setFromMatrixPosition(ref.current.matrixWorld);
				// dispatch({type: "position", position})
				dispatch({type: "zoom", zoom : true})
				// camera.lookAt(position)
				// console.log(props.name)
			}} // TODO Show tooltip
		>
			<planeBufferGeometry attach="geometry" args={[70, 70, 30]} />
			<meshBasicMaterial side={THREE.BackSide} depthTest={false} transparent attach="material" map={texture} />
			<Dom>
				<div onClick={e=>{globalState.state.position.setFromMatrixPosition(ref.current.matrixWorld);
									dispatch({type: "zoom", zoom : true})
									e.preventDefault(); //will stop the link href to call the blog page

									setTimeout(function () {
									window.location.href = '/category/'+props.data	; //will redirect to your blog page (an ex: blog.html)
									 }, 700); //will call the function after 2 secs.
								
								}}
									style={{cursor:'pointer'}} className="content-planet-sdauhsdayudash">
				<a className="categories" >{props.name}</a>
				</div>
			</Dom>
		</mesh>
	)
}

const CameraController = () => {
	const globalState = useContext(store);
	const { camera } = useThree()
	useFrame(() => {
		// ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 1)
		if (globalState.state.zoom === false) {
			camera.position.x = lerp(camera.position.x, -200, 0.08)
			camera.position.y = lerp(camera.position.y, 400, 0.08)
			camera.position.z = lerp(camera.position.z, 1000, 0.08)
			
		}
		else {
			camera.position.x = lerp(camera.position.x, globalState.state.position.x, 0.08)
			camera.position.y = lerp(camera.position.y, globalState.state.position.y, 0.08)
			camera.position.z = lerp(camera.position.z, globalState.state.position.z, 0.08)
			
		}
		camera.updateProjectionMatrix()


	})
	
// Zooms the cam from 100 to 7. Since it's inside the Suspense boundary, it will
// start doing that once everything's loaded/processed :]

return null
	}
	
export function Content() {
	const globalState = useContext(store);
	const { dispatch } = globalState;
	useEffect(() => {
		dispatch({ type: "loading" })
		fetch(`${process.env.REACT_APP_API_BASE_URL}/categories`)
			.then(res => res.json())
			.then(res => {
				console.log(res)
				dispatch({ type: "categories", categories: res["hydra:member"] })
			})
	}, [])
	console.log(globalState.state.categories.length)
	if(globalState.state.loading === false) {
		return (
			<React.Fragment>
				<Galaxy />
				<Stars />
				<PivotSphere />
				<CameraController />
			</React.Fragment>
		)
	} else {
		return null
	}
}

export default function () {
	
	return (
		<Canvas
			style={{ position: "absolute", top: 0, backgroundColor: 'black', backgroundImage: 'url(/img/space.jpg)' }}
			// camera={{ position: [-200, 400, 1000], rotation: [-0.5, -0.2, -0.6], fov: 50, near: 100, far: 5000}}
			camera={{ position: [-1000, 2000, 5000], rotation: [-0.5, -0.2, -0.6], fov: 50, near: 10, far: 10000 }}
			resize={{scroll: false}}
		>
			<GalaxyProvider>
				<Content/>
			</GalaxyProvider>
		</Canvas>
	)
}