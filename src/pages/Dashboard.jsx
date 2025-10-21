import { Container, Card } from 'react-bootstrap';
import FormularioPrueba from '../components/MaestroBienes/FormularioPrueba';

function Dashboard() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm text-center">
        <Card.Body>
          <FormularioPrueba /> 
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;