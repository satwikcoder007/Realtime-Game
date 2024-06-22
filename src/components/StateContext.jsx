"use client"

import React ,{createContext,useContext,useState} from 'react'
export const StateContext = createContext(null);
export  function StateProvider(props) {
  const [state,setState] = useState(0);
  return (
    <StateContext.Provider value={{state,setState}}>
      {props.children}
    </StateContext.Provider>
  )
}

