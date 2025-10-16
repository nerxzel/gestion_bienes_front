import { Container, Row, Col } from 'react-bootstrap';
import AuthLayout from '../components/AuthLayout';
import ValidarCodigoForm from '../components/ValidarCodigoForm';

function ValidarCodigo() {
    return (
        <AuthLayout>
            <ValidarCodigoForm />
        </AuthLayout>
    );
}

export default ValidarCodigo;