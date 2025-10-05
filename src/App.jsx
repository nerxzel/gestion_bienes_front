import React from "react";
import Login from './pages/Login';
import './styles/themes.css';

function App({children}) {
  
  return (
    <>
      <main>
        {children}
      </main>
    </>
  )
}

export default App
