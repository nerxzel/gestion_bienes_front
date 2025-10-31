import { Container, Card } from 'react-bootstrap';
import UnidadesMedidaGrid from '../../components/MaestroUnidadesMedidas/UnidadesMedidaGrid';

function GridUnidadesMedidas() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm ">
        <Card.Body>
          <UnidadesMedidaGrid /> 
        </Card.Body>
      </Card>
    </Container>
  );
}

export default GridUnidadesMedidas;