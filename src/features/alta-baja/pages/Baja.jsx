import { Container, Card } from 'react-bootstrap';
import BajaForm from '../components/BajaForm.jsx';

function Baja() {
    return (
        <Container className="mt-5">
            <Card className="p-4 shadow-sm ">
                <Card.Body>
                    <BajaForm />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Baja;