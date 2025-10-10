import { Button, Container, Card } from 'react-bootstrap';
import Saludito from '../components/Saludito';

function Dashboard() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm text-center">
        <Card.Body>
          <h1 className="mb-3">¡Bienvenido!</h1>
          <Saludito /> 
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;