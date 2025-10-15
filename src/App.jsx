import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom';
import './styles/themes.css';

function App() {
  return (
    <>
    <NavBar />
      <main>
        <Outlet> </Outlet>
      </main>
    </>
  )
}

export default App
