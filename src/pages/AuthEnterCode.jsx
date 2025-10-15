import { Container, Row, Col } from 'react-bootstrap';
import EnterCodeForm from '../components/EnterCodeForm';

function EnterCodePage() {
    return (
        <Container fluid>
            <Row className='vh-100 align-items-center justify-content-center'>
                <Col sm={9} md={7} lg={6}>
                    <EnterCodeForm />
                </Col>
            </Row>
        </Container>
    );
}

export default EnterCodePage;