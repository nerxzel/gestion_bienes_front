
import { useEffect, useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig'; 

function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Cargando mensaje...');

  useEffect(() => {
    api.get('/api/v1/demo') 
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("Error al obtener datos protegidos:", error);
        
        setMessage('El endpoint protegido aún no está listo, ¡pero el login funciona!');
      });
  }, []); 

  const handleLogout = () => {
    
    localStorage.removeItem('authToken');
    
    navigate('/');
  };

  return (
    <Container className="mt-5 text-center">
      <Card className="p-4 shadow-sm">
        <Card.Body>
          <h1>¡Bienvenido!</h1>
          <p>Has iniciado sesión correctamente.</p>
          <hr />
          <h2 className="mt-4">Mensaje del Servidor:</h2>
          <p className="lead fst-italic">{message}</p>
          <hr />
          <Button variant="danger" onClick={handleLogout} className="mt-3">
            Cerrar Sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;