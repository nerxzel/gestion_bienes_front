import { Container, Card } from 'react-bootstrap';
import GrupoGrid from '../../components/MaestroGrupos-Clases-Subclases/GrupoGrid';

function DashboardGrupo() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm ">
        <Card.Body>
          <GrupoGrid /> 
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DashboardGrupo;