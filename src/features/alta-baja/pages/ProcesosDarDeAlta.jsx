import { Container, Card } from 'react-bootstrap';
import AltaForm from '../components/AltaForm.jsx';

function ProcesosDarDeAlta() {
    return (
        <Container className="mt-5">
            <Card className="p-4 shadow-sm ">
                <Card.Body>
                    <AltaForm />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProcesosDarDeAlta;