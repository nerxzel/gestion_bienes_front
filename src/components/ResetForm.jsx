import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';

function ResetForm() {
      const [newPassword, setNewPassword] = useState("")
      const [confirmPassword, setConfirmPassword] = useState("")
      const [error, setError] = useState(false)

      const handleSubmit = (e) => {
    e.preventDefault()

    if(newPassword === "" || confirmPassword === "") {
      setError(true)
      return
    }

    setError(false)
  }

  return (
    <Card className="p-4 shadow-sm border-2">
      <Card.Body>
        <h2 className="fw-bold text-center mb-4">Crea una Nueva Contraseña</h2>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingPassword" label="Nueva Contraseña" className="mb-3">
            <Form.Control 
              type="password" 
              placeholder=" "
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingConfirmPassword" label="Confirmar Nueva Contraseña">
            <Form.Control 
              type="password" 
              placeholder=" "
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
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

export default ResetForm;