import { Container, Row, Col } from 'react-bootstrap';
import ForgotForm from '../components/ForgotForm';

function ForgotPassword() {
    return (
        <Container>
            <Row className='vh-100 align-items-center justify-content-center'>
                <Col sm={9} md={7} lg={6}>
                    <ForgotForm />
                </Col>
            </Row>
        </Container>
    )
}

export default ForgotPassword;