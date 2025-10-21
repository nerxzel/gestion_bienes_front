import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import api from '../../api/axiosConfig'; 

function FilaEdicion({ datosIniciales, onGuardar, onCancelar, grupos = [] }) {
    const [formData, setFormData] = useState(datosIniciales);
   
    const [opcionesClase, setOpcionesClase] = useState([]);
    const [opcionesSubclase, setOpcionesSubclase] = useState([]);
    const [cargandoClases, setCargandoClases] = useState(false);
    const [cargandoSubclases, setCargandoSubclases] = useState(false);

    useEffect(() => {
        const cargarOpcionesIniciales = async () => {
            if (formData.idGrupo) { 
                setCargandoClases(true);
                try {
                    const resClases = await api.get(`/clase/dropdown/${formData.idGrupo}`);
                    setOpcionesClase(resClases.data || []);
                    if (formData.idClase) {
                        setCargandoSubclases(true);
                        try {
                            const resSubClases = await api.get(`/subclase/dropdown/${formData.idClase}`);
                            setOpcionesSubclase(resSubClases.data || []);
                        } catch (error) {
                             console.error("Error al cargar subclases iniciales:", error);
                             setOpcionesSubclase([]);
                        } finally {
                             setCargandoSubclases(false);
                        }
                    }
                } catch (error) {
                    console.error("Error al cargar clases iniciales:", error);
                    setOpcionesClase([]);
                } finally {
                    setCargandoClases(false);
                }
            }
        };
        cargarOpcionesIniciales();
    }, []);

    const handleCatalogoChange = async (e) => {
        const { name, value } = e.target; 
        const selectedId = value;

        let update = { [name]: selectedId };

        if (!selectedId) {
            if (name === 'idGrupo') {
                update = { ...update, grupo: '', idClase: '', clase: '', idSubClase: '', subClase: '' };
                setOpcionesClase([]);
                setOpcionesSubclase([]);
            } else if (name === 'idClase') {
                update = { ...update, clase: '', idSubClase: '', subClase: '' };
                setOpcionesSubclase([]);
            } else if (name === 'idSubClase') {
                update = { ...update, subClase: '' };
            }
        } else {
    
            if (name === 'idGrupo') {
                const itemSeleccionado = grupos.find((g) => g.id === parseInt(selectedId));
                update = { ...update, grupo: itemSeleccionado?.nombre || '', idClase: '', clase: '', idSubClase: '', subClase: '' };
                setOpcionesClase([]); 
                setOpcionesSubclase([]);
                setCargandoClases(true);
                try {
                    const resClases = await api.get(`/clase/dropdown/${selectedId}`);
                    setOpcionesClase(resClases.data || []);
                } catch (error) {
                    console.error("Error al cargar clases:", error);
                    setOpcionesClase([]);
                } finally {
                     setCargandoClases(false);
                }
            } else if (name === 'idClase') {
                const itemSeleccionado = opcionesClase.find((c) => c.id === parseInt(selectedId));
                update = { ...update, clase: itemSeleccionado?.name || '', idSubClase: '', subClase: '' };
                setOpcionesSubclase([]); 
                setCargandoSubclases(true);
                 try {
                    const resSubClases = await api.get(`/subclase/dropdown/${selectedId}`);
                    setOpcionesSubclase(resSubClases.data || []);
                } catch (error) {
                    console.error("Error al cargar subclases:", error);
                    setOpcionesSubclase([]);
                } finally {
                    setCargandoSubclases(false);
                }
            } else if (name === 'idSubClase') {
                const itemSeleccionado = opcionesSubclase.find((sc) => sc.id === parseInt(selectedId));
                update = { ...update, subClase: itemSeleccionado?.nombre || '' };
            }
        }
        setFormData(prevData => ({ ...prevData, ...update }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <tr>
            <td><Form.Control name="codigoInventario" value={formData.codigoInventario || ''} onChange={handleInputChange} /></td>
            <td><Form.Control name="nombre" value={formData.nombre || ''} onChange={handleInputChange} /></td>
          
            <td>
                <Form.Select
                    name="idGrupo"
                    value={formData.idGrupo || ''}
                    onChange={handleCatalogoChange}>
                    <option value="">Seleccione Grupo</option>
                    {grupos.map((grupo) => (
                        <option key={grupo.id} value={grupo.id}>
                            {grupo.nombre}
                        </option>
                    ))}
                </Form.Select>
            </td>
          
            <td>
                <Form.Select
                    name="idClase"
                    value={formData.idClase || ''}
                    onChange={handleCatalogoChange}
                    disabled={!formData.idGrupo || cargandoClases}> 
                    <option value="">{cargandoClases ? 'Cargando...' : 'Seleccione Clase'}</option>
                    {opcionesClase.map((clase) => (
                        <option key={clase.id} value={clase.id}>
                            {clase.nombre}
                        </option>
                    ))}
                </Form.Select>
            </td>
          
            <td>
                <Form.Select
                    name="idSubClase"
                    value={formData.idSubClase || ''}
                    onChange={handleCatalogoChange}
                    disabled={!formData.idClase || cargandoSubclases}> 
                     <option value="">{cargandoSubclases ? 'Cargando...' : 'Seleccione SubClase'}</option>
                    {opcionesSubclase.map((subclase) => (
                        <option key={subclase.id} value={subclase.id}>
                            {subclase.nombre}
                        </option>
                    ))}
                </Form.Select>
            </td>
          
            <td><Form.Control type="date" name="fechaAdquisicion" value={formData.fechaAdquisicion || ''} onChange={handleInputChange} /></td>
            <td>
                <Form.Select name="condicion" value={formData.condicion || 'Alta'} onChange={handleInputChange}>
                    <option value="Alta">Alta</option>
                    <option value="Baja">Baja</option>
                </Form.Select>
            </td>
    
            <td>
                <Button variant='success' className="me-2" size="sm" onClick={() => onGuardar(formData)}>Guardar</Button>
                <Button variant='danger' size="sm" onClick={onCancelar}>Cancelar</Button>
            </td>
        </tr>
    );
}

export default FilaEdicion;