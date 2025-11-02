import { Container, Card } from 'react-bootstrap';
import BajaForm from '../../components/Alta-Baja/BajaForm';

function ProcesosDarDeBaja() {
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

export default ProcesosDarDeBaja;