import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';

function RestablecerForm() {
      const [nuevaContrasenha, setNuevaContrasenha] = useState("")
      const [confirmarContrasenha, setConfirmarContrasenha] = useState("")
      const [error, setError] = useState(false)

      const manejarEnvio = (e) => {
    e.preventDefault()

    if(nuevaContrasenha === "" || confirmarContrasenha === "") {
      setError(true)
      return
    }

    setError(false)
  }

  return (
    <Card className="p-4 shadow-sm border-2">
      <Card.Body>
        <h2 className="fw-bold text-center mb-4">Crea una Nueva Contraseña</h2>
        <Form onSubmit={manejarEnvio}>
          <FloatingLabel controlId="floatingPassword" label="Nueva Contraseña" className="mb-3">
            <Form.Control 
              type="password" 
              placeholder=" "
              value={nuevaContrasenha}
              onChange={e => setNuevaContrasenha(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingConfirmPassword" label="Confirmar Nueva Contraseña">
            <Form.Control 
              type="password" 
              placeholder=" "
              value={confirmarContrasenha}
              onChange={e => setConfirmarContrasenha(e.target.value)}
            />
          </FloatingLabel>

          <div className="d-grid mt-4">
            <Button variant="primary" type="submit" size="lg">
              Restablecer Contraseña
            </Button>
          </div>
        </Form>
        {error && <p>Todos los campos son obligatorios</p>}
      </Card.Body>
    </Card>
  );
}

export default RestablecerForm;