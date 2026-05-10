export const initialStore = () => {
  return {
    contactos: [],
    contactoEditando: null 
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'agregar_contacto':
      return {
        ...store,
        contactos: [...store.contactos, action.payload]
      };

    case 'seleccionar_contacto': 
      return {
        ...store,
        contactoEditando: action.payload
      };

    case 'actualizar_contacto':
      return {
        ...store,
        contactos: store.contactos.map(contacto => 
          contacto.id === action.payload.id ? action.payload : contacto
        ),
        contactoEditando: null 
      };

      case 'eliminar_contacto':
      return {
        ...store,
        contactos: store.contactos.filter(contacto => contacto.id !== action.payload)
      };

    default:
      throw Error('Unknown action.');
  }    
}