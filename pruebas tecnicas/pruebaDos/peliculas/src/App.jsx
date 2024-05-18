import { useCallback, useState } from 'react';
import './App.css'
import { Movies } from './components/listadoMovies'
import { useMovies } from './funciones/customHookMovies';
import debounce from 'just-debounce-it'

function App() {

  const [sort, setSort] = useState(false)
  const [search, setSearch] = useState('')
  const [errorText, setError] = useState()
  const {getMovies, sortedMovies, error, loading} = useMovies({search, sort})
  
  const debouncedGetMovies = useCallback(
    debounce(search => {
    getMovies({search})
  }, 300)
  ,[getMovies]
  )

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(event.target.value)
    debouncedGetMovies(newSearch)
  }
 
  const HandlerSubmit = (event) => {
    event.preventDefault();

    //ACA PODEMOS ELEGIR TODOS LOS NAMES DE LOS INPUTS
    const {txtPeliculas} = Object.fromEntries(new window.FormData(event.target))
    console.log(txtPeliculas);
    
    if(txtPeliculas === '')
    {
      setError('No se puede buscar peliculas vacias')
      return
    }
    
    if(txtPeliculas.match(/^\d+$/))
    {
      setError('No se puede buscar peliculas con numeros')
      return
    }
    
    if(txtPeliculas.length < 3)
    {
      setError('No se puede buscar peliculas con 3 caracteres')
      return
    }
    
    setError('')
    getMovies({search})
  }

  const HandlerSort = () => {
    setSort(!sort)
  }
  
  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='formPeliculas' onSubmit={HandlerSubmit}>
          <label htmlFor="txtPeliculas">Ingrese la pelicula</label>
          <div>
            <input type="text" name='txtPeliculas' id='txtPeliculas' value={search} onChange={handleChange}
            style={{border: '1px solid transparent', borderColor: errorText ? 'red': 'transparent' }} 
            placeholder='Avengers, Narnia, Star Wars...'/>
            <input type="checkbox" onChange={HandlerSort} checked={sort}/>
            <button type='submit'>Buscar</button>
          </div>
        {errorText && <p className='p-error'>{errorText}</p>}  
        </form>
      </header>
      
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={sortedMovies}/>
        }
      </main>
    </div>
    )
}

export default App
