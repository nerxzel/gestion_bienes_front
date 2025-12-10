import { Container, Card } from 'react-bootstrap';
import SubclaseGrid from '../components/SubclaseGrid.jsx';

function DashboardSubclase() {
  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm ">
        <Card.Body>
          <SubclaseGrid />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DashboardSubclase;