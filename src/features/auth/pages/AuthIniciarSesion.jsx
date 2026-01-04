import AuthLayout from '../../../layouts/AuthLayout';
import IniciarSesionForm from '../components/IniciarSesionForm';
import { Container, Row, Alert, Col, Card } from 'react-bootstrap'

function IniciarSesion() {
    return (
        <AuthLayout>
            <IniciarSesionForm />

            <Card className="shadow-lg mt-4"> 
                <Card.Body>
                    <Alert variant="info" className="mb-0">
                        <p className="mb-0 small">
                            Usa estas credenciales para ver un demo del sistema<br/>
                            <strong>Email:</strong> invitado@demo.com<br/>
                            <strong>Pass:</strong> Demo123
                        </p>
                    </Alert>
                </Card.Body>
            </Card>
        </AuthLayout>
    )
}

export default IniciarSesion;