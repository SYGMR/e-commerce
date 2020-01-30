import React, { createContext, useReducer } from 'react';
import * as THREE from "three";

const initialState = { hover: false, position: new THREE.Vector3(), zoom: false, loadingCategories: null, loadingShops: null, categories: [], shops: []};
const store = createContext(initialState);
const { Provider } = store;

const GalaxyProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'hover': // do not create a new object to not trigger re-rendering
        state.hover = action.hover
        return state
      case "position": // do not create a new object to not trigger re-rendering
        state.position = action.position
        return state
      case "zoom": // do not create a new object to not trigger re-rendering
        state.zoom = action.zoom
        return state
      case "categoriesLoaded":
        return {
          ...state,
          loadingCategories: false,
          categories: action.categories
        }
      case "shopsLoaded":
        return {
          ...state,
          loadingShops: false,
          shops: action.shops,
          category: action.category
        }
      case "loadingCategories":
        return {
          ...state,
          loadingCategories: true
        }
      case "loadingShops":
        return {
          ...state,
          category_id: action.category_id,
          loadingShops: true
        }
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, GalaxyProvider }