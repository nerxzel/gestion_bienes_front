import { Container, Card } from 'react-bootstrap';
import UbicacionGrid from '../components/UbicacionGrid.jsx';

function DashboardUbicacion() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm ">
        <Card.Body>
          <UbicacionGrid />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DashboardUbicacion;