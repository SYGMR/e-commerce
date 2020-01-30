import React, {useState, useRef, useEffect, useMemo, Suspense, useContext} from 'react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useFrame, useLoader, Dom} from "react-three-fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import {useSpring, a} from 'react-spring/three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';	
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import lerp from 'lerp';
import * as THREE from "three";

import { store, GalaxyProvider} from './GalaxyContext';
import { Shop } from '@material-ui/icons';


extend({ OrbitControls, UnrealBloomPass, EffectComposer, RenderPass })

 // var hover = false;


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



function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
  }
//{ name: "Shop 1", position: [400, 1, 40], "rotation-z": Math.PI / 2 },
export function PivotSphere(props) {
	console.log(props.shops)

	const globalState = useContext(store);
	const ref = useRef()
	useFrame(() => {
		if (globalState.state.hover === false) 
				{ref.current.rotation.z += 0.002}
			})

	return (
		<group>		
			<mesh  ref={ref} position={[0, 1, 0]} rotation-x={Math.PI / 2}>
				<planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
				{props.shops.map(shop => (
					<Planet cat = {props.categorie} idshop= {shop.id} name={shop.name} position ={[randomIntFromInterval(400,-400),randomIntFromInterval(400,-400),0]} {...props}/>
				))}
			</mesh>
		</group>
	)
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  } 


export function Planet(props) {

	
	const globalState = useContext(store);
	const { dispatch } = globalState;
	const ref = useRef()

	var texturesList = [
		'/img/planetTexture/2k_jupiter.jpg',
		'.img/planetTexture/2k_mars.jpg',
		'/img/planetTexture/2k_saturn.jpg',
		'/img/planetTexture/2k_venus_atmosphere.jpg',
		'/img/planetTexture/2k_mercury.jpg'

	];
	var randIndex = getRandomInt(0, texturesList.length - 1);

	var randTexture = new THREE.TextureLoader().load(texturesList[randIndex]);
	const dom = useRef()
	return (
		<mesh rotation-y={Math.PI / 2} 
		ref={ref}
		onClick={e=>{
			globalState.state.position.setFromMatrixPosition(ref.current.matrixWorld);
			dispatch({type: "zoom", zoom : true})}}
			{...props}

		>
			<sphereGeometry attach="geometry" args={[getRandomInt(20,40), 20, 30]} />
			<meshLambertMaterial attach="material" color='grey' />
			<Dom>
				<div onClick={e=>{globalState.state.position.setFromMatrixPosition(ref.current.matrixWorld);
									dispatch({type: "zoom", zoom : true})
									e.preventDefault(); //will stop the link href to call the blog page

									setTimeout(function () {
										window.location.href = '/category/'+props.cat+'/shop/'+props.idshop; //will redirect to your blog page (an ex: blog.html)
									 }, 700); //will call the function after 2 secs.
								 
									}}
									style={{cursor:'pointer'}} className="content-planet-sdauhsdayudash">
				<a className="categories">{props.name}</a>
				</div>
			</Dom>
		</mesh>
	)
}




const Controls = (props) => {
	const globalState = useContext(store);
	const { camera} = useThree()
  
	useFrame(() => {
		// ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 1)
		if (globalState.state.zoom === false) {
			camera.position.x = lerp(camera.position.x, -150, 0.08)
			camera.position.y = lerp(camera.position.y, 300, 0.08)
			camera.position.z = lerp(camera.position.z, 750, 0.08)
			
		}
		else {
			camera.position.x = lerp(camera.position.x, globalState.state.position.x, 0.08)
			camera.position.y = lerp(camera.position.y, globalState.state.position.y, 0.08)
			camera.position.z = lerp(camera.position.z, globalState.state.position.z, 0.08)
			
		}
		camera.updateProjectionMatrix()
	})
  
	return (
	null
	)
  }

export default function(props) {

	
	return (
		<Canvas
		onCreated={({camera})=>camera.lookAt(0,0,0)}
		style={{ backgroundImage: 'url(/img/space.jpg)'}}
		camera={{ position: [-1000, 2000, 5000],fov: 50, near: 100, far: 5000}}
		resize={{scroll: false }}
		>
		<GalaxyProvider>
			<pointLight position={[1,1,1]}/>
			<ambientLight intensity={0.2}/>
			<System/>
			<PivotSphere shops={props.shops}
						categorie={props.categorie} />
			<Controls/>
		</GalaxyProvider>
			</Canvas>
	)
}