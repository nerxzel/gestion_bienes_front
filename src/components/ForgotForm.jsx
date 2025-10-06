import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { useState } from 'react';

function ForgotForm() {
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const validateForm = () => {
      const newErrors = {};

       const emailRegex = /\S+@\S+\.\S+/;

      if(!email) {
        newErrors.email = "Favor, el campo de correo no puede estar vacío"
      } else if (!emailRegex.test(email)) {
        newErrors.email = "Por favor, ingresa un formato de correo válido (ejemplo@ejemplo.com).";
      }

      return newErrors;
    }

    const handleSubmit = (e) => {
    e.preventDefault()

    const validateErrors = validateForm();

    if(Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors)
      return
    }

    setErrors({})
    navigate('/enter-code');
  }

  return (
    <Card className="p-4 shadow-sm border-2">
      <Card.Body>
        <h2 className="fw-bold text-center mb-2">Recuperar Contraseña</h2>
        <p className="text-center text-muted mb-4">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        
        <Form onSubmit={handleSubmit} noValidate>
          <FloatingLabel controlId="floatingEmail" label="Correo Electrónico" className="mb-3">
            <Form.Control type="email" 
                          value={email}
                          placeholder=" " 
                          onChange={e => setEmail(e.target.value)}
                          isInvalid={!!errors.email}/>
            <Form.Control.Feedback type='invalid'>
              {errors.email}
            </Form.Control.Feedback>
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

export default ForgotForm;