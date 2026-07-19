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
            const textData = await respuesta.text();
            
            const dataGuardada = textData ? JSON.parse(textData) : {};
            
            if (contacto.id) {
                dispatch({ type: 'actualizar_contacto', payload: dataGuardada });
            } else {
                dispatch({ type: 'agregar_contacto', payload: dataGuardada });
            }
            
            navigate('/');
        } else {
            const errorText = await respuesta.text();
            console.error("Error del servidor HTTP:", errorText);
            alert(`El servidor rechazó el contacto. Código: ${respuesta.status}`);
        }
    } catch (error) {
        console.error("Error crítico capturado en el catch:", error.message);
        alert(`Fallo en la ejecución: ${error.message}`);
    }
  };