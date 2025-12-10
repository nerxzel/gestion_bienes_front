import { Container, Card } from 'react-bootstrap';
import ModeloGrid from '../components/ModeloGrid.jsx';

function DashboardModelo() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm ">
        <Card.Body>
          <ModeloGrid />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DashboardModelo;