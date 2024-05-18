import { EVENTS } from './consts'

/*
window.history es un objeto en JavaScript que proporciona una interfaz para interactuar con el historial del navegador del usuario. 
Permite acceder al historial de navegación del usuario, así como manipularlo programáticamente.
*/
export function Navigation(href){
    /* 
    window.history.pushState() es un método del objeto history que permite modificar la URL del navegador sin recargar la página.
    Esto es parte de la API de Historial del navegador y se utiliza comúnmente en aplicaciones de una sola página (SPA) 
    y en navegación basada en JavaScript.
    */
    window.history.pushState({}, '', href)
  
    // Creamos un evento personalizado para que el navegador nos avisa de que ha cambiado de ruta.
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
  
    /* 
    window.dispatchEvent() es un método en JavaScript que permite despachar (o disparar) un evento personalizado 
    en el objeto window o cualquier otro objeto que herede de EventTarget. Esto significa que puedes usar dispatchEvent() 
    para simular la activación de un evento específico en el navegador.
    */
    window.dispatchEvent(navigationEvent)
  } 
  
  /*
  target: Esto para poderlo abrir en otra ventana.
  to: Destino.
  ...props: Lo que se le va a pasar a la etiqueta <a>, Ej: el children.
  */
  export function Link({target, to, ...props})
  {
    const handlerClick = (event) => {

    //para activar los atajos del teclado, Ej: CTRL + CLICK
    const isMainEvent = event.button === 0 // click izquierdo (1er botón click )
    const isModifiendEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey // Atajos.
    const isManageableEvent = target === undefined || target === '_self'

    if(isMainEvent && isManageableEvent && !isModifiendEvent)
    {
        //para que no recargue la pág
        event.preventDefault()

        Navigation(to) //Navegación por SPA
    }

    }

    return <a onClick={handlerClick} href={to} target={target} {...props}/>
  }