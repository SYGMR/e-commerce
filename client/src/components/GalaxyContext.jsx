import React, { createContext, useReducer } from 'react';
import * as THREE from "three";

const initialState = { hover: false, position: new THREE.Vector3(), zoom: false, loading: null, categories: []};
const store = createContext(initialState);
const { Provider } = store;

const GalaxyProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'hover':
        state.hover = action.hover
        return state
      case "position":
        state.position = action.position
        return state
      case "zoom":
        state.zoom = action.zoom
        return state
      case "categories":
        return {
          ...state,
          loading: false,
          categories: action.categories
        }
      case "loading":
        return {
          ...state,
          loading: true
        }
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, GalaxyProvider }