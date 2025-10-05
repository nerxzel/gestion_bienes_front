import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { useState } from 'react';

function ContrasenhaForm() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)

    const manejarEnvio = (e) => {
    e.preventDefault()

    if(email === "") {
      setError(true)
      return
    }

    setError(false)
  }

  return (
    <Card className="p-4 shadow-sm border-2">
      <Card.Body>
        <h2 className="fw-bold text-center mb-2">Recuperar Contraseña</h2>
        <p className="text-center text-muted mb-4">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        
        <Form onSubmit={manejarEnvio}>
          <FloatingLabel controlId="floatingEmail" label="Correo Electrónico" className="mb-3">
            <Form.Control type="email" 
                          value={email}
                          placeholder=" " 
                          onChange={e => setEmail(e.target.value)}/>
          </FloatingLabel>

          <div className="d-grid mt-4">
            <Button variant="primary" type="submit" size="lg">
              Enviar Enlace
            </Button>
          </div>
        </Form>
        <p>{error && <p>Todos los campos son obligatorios</p>}</p>
        <div className="text-center mt-3">
            <Link to="/">Volver a Iniciar Sesión</Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ContrasenhaForm;