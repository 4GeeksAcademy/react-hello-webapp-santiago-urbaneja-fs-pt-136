import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom"; 

const AGENDA_SLUG = "santiago024"; 

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        const cargarAgenda = async () => {
            try {
                const res = await fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`);
                
                if (res.ok) {
                    const data = await res.json();
                    const contactosParaGuardar = data.contacts ? data.contacts : data;
                    dispatch({ type: 'cargar_contactos', payload: contactosParaGuardar });
                } else if (res.status === 404) {
                    console.log("La agenda está vacía o recién creada.");
                }
            } catch (error) {
                console.error("Error al cargar los contactos:", error);
            }
        };

        cargarAgenda();
    }, []);

    const handleEditar = (contacto) => {
        dispatch({ type: 'seleccionar_contacto', payload: contacto });
        navigate('/demo');
    };

    const handleEliminar = async (id) => {
        try {
            const res = await fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts/${id}`, {
                method: "DELETE"
            });
            
            if (res.ok || res.status === 204) {
                dispatch({ type: 'eliminar_contacto', payload: id });
            }
        } catch (error) {
            console.error("Error eliminando contacto:", error);
        }
    };

    return (
        <div>
            <div className="container text-end mt-4">
                <button className="btn btn-success" onClick={() => navigate('/demo')}>Añadir nuevo contacto</button>
            </div>
            
            {store.contactos.map((contacto) => (
                <div key={contacto.id} className="contactDiv mx-auto container d-flex flex-row mt-3">
                    <div className="contactDivProfile">
                        <img src="https://galeri14.uludagsozluk.com/827/whatsapp-profiline-kendi-fotografini-koymayan-kisi_1132920.jpg" alt="Perfil" />
                    </div>
                    <div className="contactDivInfo">
                        <h1>{contacto.name}</h1>
                        <p id="info"><i className="fa-solid fa-location-dot"></i>{contacto.address}</p>
                        <p id="info"><i className="fa-solid fa-phone"></i>{contacto.phone}</p>
                        <p id="info"><i className="fa-solid fa-at"></i>{contacto.email}</p>
                    </div>
                    <div className="contactDivButtons container text-end">
                        <button id="button1" onClick={() => handleEditar(contacto)}>
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                        </button>
                        <button id="button2" onClick={() => handleEliminar(contacto.id)}>
                            <i className="fa-solid fa-trash-can me-2"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};