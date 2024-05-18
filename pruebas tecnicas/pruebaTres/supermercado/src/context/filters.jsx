import {createContext, useState } from "react";

// 1- Crear el contexto
export const FiltersContext = createContext() // => Este es el que tenemos que consumir.

// 2- Crear el provider, para proveer el contexto
export function FiltersProvider({ children }) // => Este es el que nos provee de acceso al contexto.
{
    const[filters, setFilters] = useState(
    {
        category: 'all',
        minPrice: 0
    })

    return (
        <FiltersContext.Provider value={{
            filters, 
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}

//useContext
/*
    Este se usa para estados que cambien con poca frecuencia o que sean pequeños

    Ejemplo: Cuando un usario cierra sesión
*/ 