import React, { useContext, useRef } from 'react';
import { Dom } from "react-three-fiber";

import { store } from '../store/GalaxyProvider';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Planet(props) {

  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const ref = useRef()

  // var texturesList = [
  //   '/img/planetTexture/2k_jupiter.jpg',
  //   '.img/planetTexture/2k_mars.jpg',
  //   '/img/planetTexture/2k_saturn.jpg',
  //   '/img/planetTexture/2k_venus_atmosphere.jpg',
  //   '/img/planetTexture/2k_mercury.jpg'

  // ];
  // var randIndex = getRandomInt(0, texturesList.length - 1);
  // var randTexture = new THREE.TextureLoader().load(texturesList[randIndex]);
  return (
    <mesh rotation-y={Math.PI / 2}
      ref={ref}
      onClick={e => {
        state.position.setFromMatrixPosition(ref.current.matrixWorld);
        dispatch({ type: "zoom", zoom: true })
      }}
      {...props}

    >
      <sphereGeometry attach="geometry" args={[getRandomInt(20, 40), 20, 30]} />
      <meshLambertMaterial attach="material" color='grey' />
      <Dom>
        <div onClick={e => {
          state.position.setFromMatrixPosition(ref.current.matrixWorld);
          dispatch({ type: "zoom", zoom: true })
          e.preventDefault(); //will stop the link href to call the blog page

          setTimeout(function () {
            state.history.push('/category/' + state.category_id + '/shop/' + props.shop_id)
          }, 700); //will call the function after 2 secs.

        }}
          style={{ cursor: 'pointer' }} className="content-planet-sdauhsdayudash">
          <a className="categories">{props.shop_name}</a>
        </div>
      </Dom>
    </mesh>
  )
}