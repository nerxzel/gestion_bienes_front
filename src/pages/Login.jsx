import {Container, Row, Col} from 'react-bootstrap';
import LoginForm from '../components/LoginForm';


function Login() {
    return (
        <Container fluid>
            <Row className='vh-100 align-items-center justify-content-center'>
  
                <Col md={5} lg={4}>
                    <div>
                        <LoginForm />
                    </div>
                </Col>
            </Row>
    
        </Container>
    )

}

export default Login;