import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from './movies';


export function useMovies({search, sort})
{
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const previusResultSearch = useRef(search);


  //useMemo se usa para todo

  // const getMovies = useMemo(() =>{
  //   return async ({search}) =>{
  //    if(search === previusResultSearch.current) return
     
  //    try
  //    {
  //      previusResultSearch.current = search
  //      const newMovies = await searchMovies({search})
  //      setMovies(newMovies)
  //      setError(null);
  //      setLoading(true);
  //    }
  //    catch(e)
  //    {
  //      setError(e.message)
  //    }
  //    finally
  //    {
  //      setLoading(false)
  //    }
  //   }
  // }, [])

  //useCallback se usa para funcionen

  const getMovies = useCallback(async ({search}) =>{

    if(search === previusResultSearch.current) return
    
    try
    {
      previusResultSearch.current = search
      const newMovies = await searchMovies({search})
      setMovies(newMovies)
      setError(null);
      setLoading(true);
    }
    catch(e)
    {
      setError(e.message)
    }
    finally
    {
      setLoading(false)
    }

  }, [search])

  //useMemo
  const sortedMovies = useMemo(() => {
    return sort 
    ? [... movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies
  }, [sort, movies])
  
  return {sortedMovies, getMovies, error, loading}
}