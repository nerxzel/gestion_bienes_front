import { Container, Row, Col } from 'react-bootstrap';
import ResetForm from '../components/ResetForm';

function ResetPassword() {
    return (
        <Container>
            <Row className='vh-100 align-items-center justify-content-center'>
                <Col sm={9} md={7} lg={6}>
                    <ResetForm />
                </Col>
            </Row>
        </Container>
    )
}

export default ResetPassword;