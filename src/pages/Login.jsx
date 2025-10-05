import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import loginImage from '../assets/loginIMG.png';

function Login() {
    return (
        <Container className='vh-100 d-flex align-items-center justify-conten-center'>
            <Row>
                <Col md={7} lg={8} className='d-none d-md-block p-0'>
                    <img src={loginImage} alt='Login' className='login-image' />
                </Col>
            </Row>
    
        </Container>
    )

}

export default Login;