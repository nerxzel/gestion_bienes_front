import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginForm() {
  return (
    <Card className="p-3 shadow-sm border-2">
      <Card.Body>
        <h2 className="fw-bold text-center mb-4">Inicie sesión</h2>
        
        <Form>
          <FloatingLabel controlId="floatingEmail" label="Ingresa tu correo o usuario" className="mb-3">
            <Form.Control type="text" placeholder=" " />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Contraseña">
            <Form.Control type="password" placeholder=" " />
          </FloatingLabel>

          <div className="text-end mt-2">
            <Link to="/recuperar" className="small text-muted">¿Olvidaste tu contraseña?</Link>
          </div>
          
          <div className="d-grid mt-4">
            <Button variant="primary" type="submit" size="lg">
              Iniciar Sesión
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LoginForm;