import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig'; 

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    api.post('/logout')
      .catch(error => {
        console.error("Error durante el logout:", error);
      })
      .finally(() => {
        navigate('/');
      });
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm text-center">
        <Card.Body>
          <h1 className="mb-3">¡Bienvenido!</h1>
          <p>Has accedido a una ruta protegida correctamente.</p>
          <Button variant="danger" onClick={handleLogout} className="mt-3">
            Cerrar Sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;