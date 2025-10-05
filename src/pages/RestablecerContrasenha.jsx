import { Container, Row, Col } from 'react-bootstrap';
import RestablecerForm from '../components/RestablecerForm';

function RestablecerContrasenha() {
    return (
        <Container fluid>
            <Row className='vh-100 align-items-center justify-content-center'>
                <Col md={5} lg={4}>
                    <RestablecerForm />
                </Col>
            </Row>
        </Container>
    )
}

export default RestablecerContrasenha;