import { useState } from 'react';
import { Form, Button, Card, FloatingLabel, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api/axiosConfig'

function IniciarSesionForm() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    const validateErrors = validateForm();

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors)
      return;
    }

    setErrors({})
    setLoading(true);

    try {
      const loginPayload = {
        email: user,
        password: password
      };

      const response = await api.post('/user/login', loginPayload)
      const token = response.data.token;
      const userData = response.data.user;

      localStorage.setItem('userToken', token);
      localStorage.setItem('userInfo', JSON.stringify(userData))

      navigate('/dashboard');

    } catch (error) {

      if (error.response && error.response.status === 401) {
        setServerError("Usuario o contraseña incorrectos");
      } else {
        setServerError("No se pudo conectar con el servidor. Inténtalo más tarde.")
      }

    } finally {
      setLoading(false)
    }
  };

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
              isInvalid={!!errors.user}
              disabled={loading} />
            <Form.Control.Feedback type="invalid">
              {errors.user}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Contraseña">
            <Form.Control type="password"
              value={password}
              placeholder=" "
              onChange={e => setPassword(e.target.value)}
              isInvalid={!!errors.password}
              disabled={loading} />
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>

          {serverError && <p className="text-danger small mt-3">{serverError}</p>}

          <div className="text-end mt-2">
            <Link to="/olvide-contrasenha" className="small text-muted">¿Olvidaste tu contraseña?</Link>
          </div>

          <div className="d-grid mt-4">
            <Button variant="primary" type="submit" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Ingresando...</span>
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>

  )

}

export default IniciarSesionForm;