import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom'; 

function ResetForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = "Este campo no puede quedar vacío.";
    } 

    if (!confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar la contraseña.";
    }

    else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
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
    console.log("Formulario válido, enviando datos...");
   
  };

  return (
    <Card className="p-4 shadow-sm border-2">
      <Card.Body>
        <h2 className="fw-bold text-center mb-4">Crea una Nueva Contraseña</h2>
        
        <Form onSubmit={handleSubmit} noValidate>
          <FloatingLabel controlId="floatingPassword" label="Nueva Contraseña" className="mb-3">
            <Form.Control 
              type="password" 
              placeholder=" "
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              isInvalid={!!errors.newPassword} 
            />
            <Form.Control.Feedback type="invalid">
              {errors.newPassword}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel controlId="floatingConfirmPassword" label="Confirmar Nueva Contraseña">
            <Form.Control 
              type="password" 
              placeholder=" "
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </FloatingLabel>

          <div className="d-grid mt-4">
            <Button variant="primary" type="submit" size="lg">
              Restablecer Contraseña
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ResetForm;