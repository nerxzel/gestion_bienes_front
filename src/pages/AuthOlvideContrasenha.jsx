import { Container, Row, Col } from 'react-bootstrap';
import AuthLayout from '../components/AuthLayout';
import OlvideContrasenhaForm from '../components/OlvideContrasenhaForm';

function OlvideContrasenha() {
    return (
        <AuthLayout>
            <OlvideContrasenhaForm />
        </AuthLayout>
    )
}

export default OlvideContrasenha;