import { Container, Card } from 'react-bootstrap';
import MarcaGrid from '../../components/MaestroMarca-Modelo/MarcaGrid';

function DashboardMarca() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm ">
        <Card.Body>
          <MarcaGrid /> 
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DashboardMarca;