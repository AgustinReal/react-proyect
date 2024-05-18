import { EVENTS } from './consts'
import { useEffect, useState, Children } from 'react'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils'

/*
  window.location.pathname es una propiedad en JavaScript que devuelve la parte de la URL después del nombre del dominio 
  y antes del signo de interrogación '?' y el marcador de número '#'. En otras palabras, window.location.pathname devuelve 
  la ruta de la URL actual.

  Por ejemplo, si la URL es "https://www.ejemplo.com/productos/televisor", window.location.pathname devolverá "/productos/televisor".
  Si la URL es "https://www.ejemplo.com/contacto?formulario=1", window.location.pathname devolverá "/contacto".
*/

export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>Error 404</h1> }){

    const[currentPath, setCurrentPath] = useState(getCurrentPath())
  
    useEffect(() => {
  
      // función callback para guardar la función
      const onLocationChange = () => {
        setCurrentPath(getCurrentPath())
      }
  
      /*Se ejecuta cada vez que se cambia la ruta de "NAVIGATION_EVENT" y esta llama a la función onLocationChange
  
      addEventListener: Es un método que se utiliza para registrar un event listener en un objeto. Este método toma dos argumentos: 
      el nombre del evento al que se desea escuchar y la función que se llamará cuando ocurra el evento.
      */
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
      // para q te deje usar el boton (<=) en el navegador.
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
  
      return() => {
        //limpiamos
        window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
        // para q te deje usar el boton (<=) en el navegador.
        window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
      }
  
    }, [])

    let routeParams = {}

    //agregarr las rutas del children => <Route /> components
    const routesFromChildren = Children.map(children, ({props, type}) => {
        const {name} = type
        const isRoute = name === 'Route'

        return isRoute ? props : null
    })


    const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

    const Page = routesToUse.find(({path}) => {
       if(path === currentPath) return true 

       /*   
       Usamos path-toregexp para poder detectar rutas dinamicas como por ejemplo:
       /seach/:query <-- :query es una ruta dinámica
       */
       const matchUrl = match(path, {decode: decodeURIComponent})
       const matched = matchUrl(currentPath) // este contiene el pad => /search/boca

       if(!matched) return false // si no lo matchea.

       // Guardamos los parámetros de la url que eran dinámicos  y que hemos extraído con path-to-regexp
       // Ej: si la ruta es /search/:query
       // La url es /search/boca
       // matched.params.query === 'boca'
       // Nota: matched.params va a ser obj con el valor de la url.
       routeParams = matched.params //aca vamos a tener => { query: 'nombre de la ruta'}, ejemplo de ruta => /seach/boca 

       return true

    })?.Component // si no encuentra ninguna ruta, este sera undefined y va mostrar el error 404 y deje de evaluar el component
  
    return Page 
    ? <Page routeParams={routeParams}/> 
    : <DefaultComponent routeParams={routeParams}/>
}
  