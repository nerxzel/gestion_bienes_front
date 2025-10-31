import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/themes.css';

function NavBar() {
  const navigate = useNavigate()
  const handleLogout = () => {
  localStorage.removeItem('userToken');
  navigate('/'); 
};

  return (
    <Navbar expand="lg" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">Gestión de Activos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
          <Nav >

            <NavDropdown title="Procesos" id="procesos-dropdown">
              <NavDropdown.Item as={Link} to='/dar-alta'>Dar de Alta</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dar-baja'>Dar de baja</NavDropdown.Item>
              <NavDropdown title="Traslado" id="traslado-nested-dropdown" drop="end">
                  <NavDropdown.Item as={Link} to='/traslado'>Traslado</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/cambio-responsable'>Cambio de Responsable</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown.Item as={Link} to='/toma-inventario'>Toma de Inventario</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/depreciar'>Depreciar</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Reportes" id="reportes-dropdown">
              <NavDropdown.Item as={Link} to='/bienes-alta'>Bienes Alta</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/bienes-baja'>Bienes Baja</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/hoja-mural'>Hoja Mural</NavDropdown.Item>
              <NavDropdown title="Etiquetas" id="etiquetas-nested-dropdown" drop="end">
                  <NavDropdown.Item as={Link} to='/etiquetas-individual'>Individual</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/etiquetas-responsable'>Por Responsable</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/etiquetas-ubicacion'>Por Ubicación</NavDropdown.Item>
              </NavDropdown>
            </NavDropdown>

            <NavDropdown title="Configuración" id="config-dropdown">
              <NavDropdown.Item as={Link} to='/dashboard-grupo'>Grupos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-clase'>Clases</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-subclase'>Subclases</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-marca'>Marca</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-modelo'>Modelo</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-ubicacion'>Ubicaciones</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-unidadesM'>Unidades de medida</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/tipo-bien'>Tipo de Bien</NavDropdown.Item>
               <NavDropdown title="Correlativos" id="correlativos-nested-dropdown" drop="end">
                  <NavDropdown.Item as={Link} to='/correlativo-grupo'>Por grupo</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown.Item as={Link} to='/maestro-funcionario'>Maestro de Funcionario</NavDropdown.Item>
              
            </NavDropdown>

            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Cerrar Sesión
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;