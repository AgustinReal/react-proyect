import { FiltersContext } from '../context/filters'
import { useContext } from 'react';

export function useFilters()
{
  const { filters, setFilters } = useContext(FiltersContext);
 
  //filtro (Aprender si o si)
  const filterProducts = (products) =>{
    return products.filter(product => {
      return (product.price >= filters.minPrice && (filters.category === 'all' || filters.category === product.category))
    })
  }
  
  return {filters, setFilters, filterProducts};
}