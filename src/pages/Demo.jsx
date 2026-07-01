import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const AGENDA_SLUG = "santiago024"; 

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [contacto, setContacto] = useState(
    store.contactoEditando || {
      name: "",     
      address: "",  
      phone: "",    
      email: ""
    }
  );

  const handleChange = (e) => {
    setContacto({ ...contacto, [e.target.name]: e.target.value });
  };

  const guardarContacto = async () => {
    const url = contacto.id 
      ? `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts/${contacto.id}`
      : `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`;
    
    const method = contacto.id ? "PUT" : "POST";

    try {
        const respuesta = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: contacto.name,
                phone: contacto.phone,
                email: contacto.email,
                address: contacto.address
            })
        });

        if (respuesta.ok) {
            const dataGuardada = await respuesta.json();
            
            if (contacto.id) {
                dispatch({ type: 'actualizar_contacto', payload: dataGuardada });
            } else {
                dispatch({ type: 'agregar_contacto', payload: dataGuardada });
            }
            
            navigate('/');
        } else {
            alert("Hubo un error guardando el contacto en la base de datos.");
        }
    } catch (error) {
        console.error("Error en el fetch:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        {contacto.id ? "Editar Contacto" : "Nuevo Contacto"}
      </h2>

      <div className="mb-4">
        <label className="form-label">Nombre Completo</label>
        <input type="text" className="form-control" name="name" value={contacto.name} onChange={handleChange} placeholder="Daniel Díaz" />
      </div>
      <div className="mb-4">
        <label className="form-label">Ubicación</label>
        <input type="text" className="form-control" name="address" value={contacto.address} onChange={handleChange} placeholder="Madrid, España" />
      </div>
      <div className="mb-4">
        <label className="form-label">Teléfono</label>
        <input type="text" className="form-control" name="phone" value={contacto.phone} onChange={handleChange} placeholder="XXX-XXX-XXX"/>
      </div>
      <div className="mb-4">
        <label className="form-label">Correo Electrónico</label>
        <input type="email" className="form-control" name="email" value={contacto.email} onChange={handleChange} placeholder="daniel@diaz.com" />
      </div>

      <div className="text-center">
        <button className="btn btn-danger w-100" onClick={guardarContacto}>Guardar Cambios</button>
      </div>
      <div className="text-center mt-3">
        <Link to="/">
          <button className="btn btn-primary w-100">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
};