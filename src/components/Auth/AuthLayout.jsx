import { Children } from 'react';
import {Container, Row, Col} from 'react-bootstrap';


function AuthLayout({children}) {
    return (
        <Container>
            <Row className='vh-100 align-items-center justify-content-center'>
                <Col sm={9} md={7} lg={6}>
                        {children}
                </Col>
            </Row>
        </Container>
    )
}

export default AuthLayout;