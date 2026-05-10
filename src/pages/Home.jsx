import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom"; 

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleEditar = (contacto) => {
        dispatch({ type: 'seleccionar_contacto', payload: contacto });
        navigate('/demo');
    };

    return (
        <div>
            <div className="container text-end mt-4">
                <button className="btn btn-success" onClick={() => navigate('/demo')}>Añadir nuevo contacto</button>
            </div>
            
            {store.contactos.map((contacto) => (
                <div key={contacto.id} className="contactDiv mx-auto container d-flex flex-row mt-3">
                    <div className="contactDivProfile">
                        <img src="https://galeri14.uludagsozluk.com/827/whatsapp-profiline-kendi-fotografini-koymayan-kisi_1132920.jpg" alt="Rigo" />
                    </div>
                    <div className="contactDivInfo">
                        <h1>{contacto.nombre}</h1>
                        <p id="info"><i className="fa-solid fa-location-dot"></i>{contacto.ubicacion}</p>
                        <p id="info"><i className="fa-solid fa-phone"></i>{contacto.telefono}</p>
                        <p id="info"><i className="fa-solid fa-at"></i>{contacto.email}</p>
                    </div>
                    <div className="contactDivButtons container text-end">
                        <button id="button1" onClick={() => handleEditar(contacto)}>
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                        </button>
                        <button id="button2" onClick={() => dispatch({ type: 'eliminar_contacto', payload: contacto.id })}>
    <i className="fa-solid fa-trash-can me-2"></i>
</button>
                    </div>
                </div>
            ))}
        </div>
    );
};