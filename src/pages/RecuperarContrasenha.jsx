import { Container, Row, Col } from 'react-bootstrap';
import ContrasenhaForm from '../components/ContrasenhaForm';

function RecuperarContrasenha() {
    return (
        <Container fluid>
            <Row className='vh-100 align-items-center justify-content-center'>
                <Col md={5} lg={4}>
                    <ContrasenhaForm />
                </Col>
            </Row>
        </Container>
    )
}

export default RecuperarContrasenha;