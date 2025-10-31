import { useState } from 'react';
import { Form, Button, Card, FloatingLabel, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ValidarCodigoForm() {
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!code) {
      newErrors.code = "El código de verificación es obligatorio.";
    } 
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log('Código enviado para verificación:', code);
    
    navigate('/restablecer-contrasenha'); 
  };

  return (
    <Card className="p-4 shadow-sm border-2">
      <Card.Body>
        <h2 className="fw-bold text-center mb-3">Verificar Código</h2>
        <p className="text-center text-muted mb-4">
          Revisa tu bandeja de entrada e ingresa el código que te enviamos para continuar.
        </p>
        
        <Form onSubmit={handleSubmit} noValidate>
          <FloatingLabel controlId="floatingCode" label="Código de Verificación" className="mb-3">
            <Form.Control 
              type="text" 
              value={code}
              placeholder=" " 
              onChange={e => setCode(e.target.value)}
              isInvalid={!!errors.code}
            />
            <Form.Control.Feedback type="invalid">
              {errors.code}
            </Form.Control.Feedback>
          </FloatingLabel>

          <div className="d-grid mt-4">
            <Button variant="primary" type="submit" size="lg">
              Verificar y Continuar
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ValidarCodigoForm;