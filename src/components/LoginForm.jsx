import { useState } from 'react';
import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [usuario, setUsuario] = useState("")
  const [contrasenha, setContrasenha] = useState("")
  const [error, setError] = useState(false)

  const manejarEnvio = (e) => {
    e.preventDefault()

    if(usuario === "" || contrasenha === "") {
      setError(true)
      return
    }

    setError(false)
  }
  
  return (
    <Card className="p-3 shadow-sm border-2">
      <Card.Body>
        <h2 className="fw-bold text-center mb-4">Inicie sesión</h2>
        
        <Form onSubmit={manejarEnvio}>
          <FloatingLabel controlId="floatingEmail" label="Ingresa tu correo o usuario" className="mb-3">
            <Form.Control type="text" 
                          value={usuario}
                          placeholder=" " 
                          onChange={e => setUsuario(e.target.value)} />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Contraseña">
            <Form.Control type="password" 
                          value={contrasenha}
                          placeholder=" "
                          onChange={e => setContrasenha(e.target.value)}/>
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
        {error && <p>Todos los campos son obligatorios</p>}
      </Card.Body>
    </Card>
  );
}

export default LoginForm;