import { Container, Card } from 'react-bootstrap';
import ClaseGrid from '../../components/MaestroGrupos-Clases-Subclases/ClaseGrid';

function DashboardClase() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm ">
        <Card.Body>
          <ClaseGrid /> 
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DashboardClase;