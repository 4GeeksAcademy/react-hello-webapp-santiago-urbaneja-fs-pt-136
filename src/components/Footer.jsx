import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Footer = () => {
    const { store } = useGlobalReducer();

    return (
        <footer className="footer mt-auto py-3 text-center">
            <div className="ml-auto">
                <p>{store.contactos.length} contactos en tu agenda</p>
            </div>
        </footer>
    );
};