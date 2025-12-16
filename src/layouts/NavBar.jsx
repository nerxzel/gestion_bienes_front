import { Navbar, Nav, NavDropdown, Container, Spinner, Alert, Modal, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaFileDownload, FaCalculator} from 'react-icons/fa';
import { manejarErrorAPI } from '../utils/errorHandler';
import { useBienes } from '../hooks/useBienes';
import api from '../api/axiosConfig';

import '../styles/themes.css';

function NavBar() {

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const [showDepreciateModal, setShowDepreciateModal] = useState(false);
  const [isDepreciating, setIsDepreciating] = useState(false);
  const [depreciateError, setDepreciateError] = useState(null);

  const navigate = useNavigate()

  const { cargarBienes } = useBienes();

  const handleLogout = () => {
  localStorage.removeItem('userToken');
  navigate('/'); 
};

  const handleDescargarReporte = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const response = await api.get('/bien/excel/all', {
        responseType: 'blob',
      });


      let filename = 'Reporte_General_Bienes.xlsx';
      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?(.+?)"?$/i);
          if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1];
          }
      }
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); 

    } catch (err) {
        console.error('Error al descargar el reporte:', err);
        setDownloadError('No se pudo descargar el reporte.');
    } finally {
        setIsDownloading(false);
    }
  };

  const handleDepreciarBienes = async () => {
      setIsDepreciating(true);
      setDepreciateError(null);
      
      try {
          await api.post('/bien/depreciar');
          setShowDepreciateModal(false);
          
          cargarBienes();

      } catch (err) {
          const mensajeError = manejarErrorAPI(err, "Error al ejecutar la depreciación masiva");
          setDepreciateError(mensajeError);
      } finally {
          setIsDepreciating(false);
      }
  };

  return (
    <>
    <Navbar expand="lg" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">Gestión de Activos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
          <Nav >

          <NavDropdown title="Procesos" id="procesos-dropdown">
              {/*<NavDropdown title="Traslado" id="traslado-nested-dropdown" drop="end" className='ms-2'>
                  <NavDropdown.Item as={Link} to='/traslado'>Traslado</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/cambio-responsable'>Cambio de Responsable</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown.Item as={Link} to='/toma-inventario'>Toma de Inventario</NavDropdown.Item>*/}
              <NavDropdown.Item onClick={() => setShowDepreciateModal(true)}>
                <FaCalculator className="me-1" /> Depreciar Bienes
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Reportes" id="reportes-dropdown">
              {/*<NavDropdown.Item as={Link} to='/bienes-alta'>Bienes Alta</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/bienes-baja'>Bienes Baja</NavDropdown.Item>*/}
              <NavDropdown.Item 
                onClick={handleDescargarReporte} 
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="ms-2">Descargando...</span>
                  </>
                ) : (
                  <>
                    <FaFileDownload className="me-1" /> Descarga Total Bienes
                  </>
                )}
              </NavDropdown.Item>
              
            <NavDropdown.Item as={Link} to='/dashboard-responsable'>
              <FaFileDownload className="me-1" /> Hoja Mural
            </NavDropdown.Item>
              {/*<NavDropdown title="Etiquetas" id="etiquetas-nested-dropdown" drop="end" className='ms-2'>
                  <NavDropdown.Item as={Link} to='/etiquetas-individual'>Individual</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/etiquetas-responsable'>Por Responsable</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/etiquetas-ubicacion'>Por Ubicación</NavDropdown.Item>
              </NavDropdown>*/}
            </NavDropdown>

            <NavDropdown title="Configuración" id="config-dropdown">
              <NavDropdown.Item as={Link} to='/dashboard-responsable'>Responsables</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-grupo'>Grupos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-clase'>Clases</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-subclase'>Subclases</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-marca'>Marca</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-modelo'>Modelo</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-ubicacion'>Ubicaciones</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/dashboard-unidadesM'>Unidades de medida</NavDropdown.Item>
              {/*<NavDropdown.Item as={Link} to='/tipo-bien'>Tipo de Bien</NavDropdown.Item>
              <NavDropdown title="Correlativos" id="correlativos-nested-dropdown" drop="end" className='ms-2'>
                  <NavDropdown.Item as={Link} to='/correlativo-grupo'>Por grupo</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown.Item as={Link} to='/maestro-funcionario'>Maestro de Funcionario</NavDropdown.Item>*/}
            </NavDropdown>

          

            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Cerrar Sesión
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {downloadError && (
          <Container className='mt-3'>
              <Alert variant="danger" onClose={() => setDownloadError(null)} dismissible>
                  {downloadError}
              </Alert>
          </Container>
      )}

      <Modal show={showDepreciateModal} onHide={() => setShowDepreciateModal(false)} centered>
        <Modal.Header closeButton>
        <Modal.Title>Confirmar Depreciación Masiva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Estás a punto de recalcular el valor para <strong>todos los bienes</strong> del sistema basado en su costo de adquisición y años de depreciación.</p>
            <p className="fw-bold">Esta acción es irreversible y actualizará la información del "Valor" y "Última Depreciación".</p>
            <p>¿Estás seguro de que deseas continuar?</p>
            
            {depreciateError && <Alert variant="danger" onClose={() => setDepreciateError(null)} dismissible>{depreciateError}</Alert>}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDepreciateModal(false)} disabled={isDepreciating}>
                Cancelar
            </Button>
            <Button 
                variant="warning" 
                onClick={handleDepreciarBienes}
                disabled={isDepreciating}
            >
                {isDepreciating ? (
                    <>
                        <Spinner as="span" animation="border" size="sm" className="me-2" />
                        Procesando...
                    </>
                ) : (
                    'Sí, ejecutar depreciación'
                )}
            </Button>
        </Modal.Footer>
    </Modal>
    </>
  );
  
}

export default NavBar;