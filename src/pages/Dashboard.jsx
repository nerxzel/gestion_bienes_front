import { Container, Card } from 'react-bootstrap';
import FormularioPrueba from '../components/MaestroBienes/BienGrid';
import BienGrid from '../components/MaestroBienes/BienGrid';

function Dashboard() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm ">
        <Card.Body>
          <BienGrid /> 
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;