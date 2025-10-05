import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

function ContrasenhaForm() {
  return (
    <Card className="p-4 shadow-sm border-2">
      <Card.Body>
        <h2 className="fw-bold text-center mb-2">Recuperar Contraseña</h2>
        <p className="text-center text-muted mb-4">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        
        <Form>
          <FloatingLabel controlId="floatingEmail" label="Correo Electrónico" className="mb-3">
            <Form.Control type="email" placeholder=" " />
          </FloatingLabel>

          <div className="d-grid mt-4">
            <Button variant="primary" type="submit" size="lg">
              Enviar Enlace
            </Button>
          </div>
        </Form>
        <div className="text-center mt-3">
            <Link to="/">Volver a Iniciar Sesión</Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ContrasenhaForm;