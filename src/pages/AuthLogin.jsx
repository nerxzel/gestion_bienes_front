import {Container, Row, Col} from 'react-bootstrap';
import LoginForm from '../components/LoginForm';

function Login() {
    return (
        <Container>
            <Row className='vh-100 align-items-center justify-content-center'>
                <Col sm={9} md={7} lg={6}>
                        <LoginForm />
                </Col>
            </Row>
        </Container>
    )
}

export default Login;