import { useState } from 'react';
import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {};

    if (!user) {
      newErrors.user = "Este campo no puede quedar vacío"
    }

    if (!password) {
      newErrors.password = "Este campo no puede quedar vacío"
    }

    return newErrors

  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const validateErrors = validateForm();

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors)
      return;
    }

    setErrors({})
  }
  
  return (
    <Card className="p-3 shadow-sm border-2">
      <Card.Body>
        <h2 className="fw-bold text-center mb-4">Inicie sesión</h2>
        
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingEmail" label="Ingresa tu correo o usuario" className="mb-3">
            <Form.Control type="text" 
                          value={user}
                          placeholder=" " 
                          onChange={e => setUser(e.target.value)} 
                          isInvalid={!!errors.user}/>
            <Form.Control.Feedback type="invalid">
              {errors.user}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Contraseña">
            <Form.Control type="password" 
                          value={password}
                          placeholder=" "
                          onChange={e => setPassword(e.target.value)}
                          isInvalid={!!errors.password}/>
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>

          <div className="text-end mt-2">
            <Link to="/forgot-password" className="small text-muted">¿Olvidaste tu contraseña?</Link>
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