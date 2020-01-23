import React, {useState, useRef, useEffect, useMemo, Suspense} from 'react';

export const GalaxyContext = React.createContext([{}, data => {
  
}]);

export const GalaxyProvider = ({children}) => {
    const [state, setState] = useState({hover: false});
    return (
      <GalaxyContext.Provider value={[state, setState]}>
        {children}
      </GalaxyContext.Provider>
    );
  };