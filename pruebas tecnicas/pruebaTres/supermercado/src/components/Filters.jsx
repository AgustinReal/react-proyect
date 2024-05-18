import { useState, useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'


export function Filters()
{
    const {filters, setFilters} = useFilters()

    //indentificadores unicos 
    //Nota nunca usarlos para key de algun array o algo q se este interando
    const minPriceFilterId = useId()
    const categoryFilterId = useId();

    const handlerChangeMinPrice = (event) =>{
        setFilters(previewState => ({
            ...previewState,
            minPrice: event.target.value
        }))
    }

    const handlerChangeCategory = (event) =>{
        // estamos pasando la función de actulizar el estado nativo de Raect a un componente hijo.
        setFilters(previewState =>({
            ...previewState,
            category: event.target.value
        }))
    }

    return(
        <section className="filters">

            <div>
                <label htmlFor={minPriceFilterId}>Precio menor que:</label>
                <input 
                type="range"
                id={minPriceFilterId}
                min={0}
                max={1000}
                onChange={handlerChangeMinPrice}
                value={filters.minPrice}
                />
                <span>{filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilterId}>Categoria</label>
                <select name="" id={categoryFilterId} onChange={handlerChangeCategory}>
                    <option value="all">Todos</option>
                    <option value="smartphones">Celulares</option>
                    <option value="laptops">Notebooks</option>
                    <option value="home-decoration">Decoración hogar</option>
                </select>
            </div>

        </section>
    )
}