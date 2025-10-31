import { Container, Card } from 'react-bootstrap';
import ModeloGrid from '../../components/MaestroMarca-Modelo/ModeloGrid';

function GridModelo() {
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

export default GridModelo;