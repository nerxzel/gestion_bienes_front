import NavBar from "./layouts/NavBar.jsx"
import { Outlet } from 'react-router-dom';
import { BienesProvider } from './context/BienContext';

function App() {
  return (
    <>
      <BienesProvider>
        <NavBar />
        <main>
          <Outlet />
        </main>
      </BienesProvider>
    </>
  )
}

export default App
