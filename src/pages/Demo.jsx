import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [contacto, setContacto] = useState(
    store.contactoEditando || {
      nombre: "",
      ubicacion: "",
      telefono: "",
      email: ""
    }
  );

  const handleChange = (e) => {
    setContacto({ ...contacto, [e.target.name]: e.target.value });
  };

  const guardarContacto = () => {
    if (contacto.id) {
        dispatch({ type: 'actualizar_contacto', payload: contacto });
    } else {
        dispatch({ type: 'agregar_contacto', payload: contacto });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        {contacto.id ? "Editar Contacto" : "Nuevo Contacto"}
      </h2>

      <div className="mb-4">
        <label className="form-label">Nombre Completo</label>
        <input type="text" className="form-control" name="nombre" value={contacto.nombre} onChange={handleChange} placeholder="Daniel Díaz" />
      </div>
      <div className="mb-4">
        <label className="form-label">Ubicación</label>
        <input type="text" className="form-control" name="ubicacion" value={contacto.ubicacion} onChange={handleChange} placeholder="Madrid, España" />
      </div>
      <div className="mb-4">
        <label className="form-label">Teléfono</label>
        <input type="text" className="form-control" name="telefono" value={contacto.telefono} onChange={handleChange} placeholder="XXX-XXX-XXX"/>
      </div>
      <div className="mb-4">
        <label className="form-label">Correo Electrónico</label>
        <input type="email" className="form-control" name="email" value={contacto.email} onChange={handleChange} placeholder="daniel@diaz.com" />
      </div>

      <div className="text-center">
        <button id="buttonSave" className="btn btn-danger" onClick={guardarContacto}>Guardar Cambios</button>
      </div>
      <div className="text-center mt-3">
        <Link to="/">
          <button id="backHomeButton" className="btn btn-primary">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
};