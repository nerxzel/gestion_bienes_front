import { Form, Col } from 'react-bootstrap'

export const FormInput = ({ label, name, value, onChange, type = "text", error, ...props }) => (
    <Form.Group as={Col} 
                md={props.md || "4"} 
                controlId={`formGrid${name}`} 
                className="mb-3">

        <Form.Label>{label}</Form.Label>

        <Form.Control
            type={type}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            isInvalid={!!error}
            {...props}
        />

        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
);

export const FormSelect = ({ label, name, value, onChange, options, loading, disabled, defaultOption = "Seleccione...", ...props }) => (
    <Form.Group as={Col} 
                md={props.md || "4"} 
                controlId={`formGrid${name}`} 
                className="mb-3">

        <Form.Label>{label}</Form.Label>
        
        <Form.Select
            name={name}
            value={value || ''}
            onChange={onChange}
            disabled={disabled || loading}
            {...props}
        >
            <option value="">{loading ? 'Cargando...' : defaultOption}</option>
            {options.map(opt => (
                <option key={opt.id} value={opt.id}>
                    {opt.nombre || `${opt.rut} - ${opt.nombre}`} 
                </option>
            ))}
        </Form.Select>
    </Form.Group>
);

