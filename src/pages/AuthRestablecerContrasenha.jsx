import { Container, Row, Col } from 'react-bootstrap';
import AuthLayout from '../components/AuthLayout'
import RestablecerContrasenhaForm from '../components/RestablecerContrasenhaForm';

function RestablecerContrasenha() {
    return (
        <AuthLayout>
            <RestablecerContrasenhaForm />
        </AuthLayout>
    )
}

export default RestablecerContrasenha;