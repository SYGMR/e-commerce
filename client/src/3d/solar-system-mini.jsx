import React, { useContext, useRef } from 'react';
import { Dom } from "react-three-fiber";

import * as THREE from "three";

import { store } from '../store/GalaxyProvider';

export default function SolarSystem(props) {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const ref = useRef()
  const texture = new THREE.TextureLoader().load('/img/flare.png');
  return (
    <mesh
      ref={ref}
      {...props}
      onPointerOver={e => {

      }}
      onClick={e => {
        globalState.state.position.setFromMatrixPosition(ref.current.matrixWorld);
        dispatch({ type: "zoom", zoom: true })
      }} // TODO Show tooltip
    >
      <planeBufferGeometry attach="geometry" args={[70, 70, 30]} />
      <meshBasicMaterial side={THREE.BackSide} depthTest={false} transparent attach="material" map={texture} />
      <Dom>
        <div onClick={e => {
          globalState.state.position.setFromMatrixPosition(ref.current.matrixWorld);
          dispatch({ type: "zoom", zoom: true })
          e.preventDefault(); //will stop the link href to call the blog page

          setTimeout(function () {
            window.location.href = '/category/' + props.data; //will redirect to your blog page (an ex: blog.html)
          }, 700); //will call the function after 2 secs.

        }}
          style={{ cursor: 'pointer' }} className="content-planet-sdauhsdayudash">
          <a className="categories" >{props.name}</a>
        </div>
      </Dom>
    </mesh>
  )
}