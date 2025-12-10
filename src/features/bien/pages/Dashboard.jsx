import { Container, Card } from 'react-bootstrap';
import BienGrid from '../components/BienGrid';

function Dashboard() {
  return (
    <Container className="mt-5 container-ancho-personalizado">
      <Card className="p-4 shadow-sm ">
        <Card.Body>
          <BienGrid />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;