
function ListarMovies ({movies}) 
{
    return(
        <ul className="list-peliculas">
        {
            movies.map( movie => (
                <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.poster} alt={movie.title} />
                </li>
            ))
        }
        </ul>
    )
}

function ListarErrorBusqueda (){
    return(
        <p> No se encontros las pelis de esa búsqueda...</p>
    )
}

export function Movies ({movies}){
    const hasMovies = movies

    return(
        hasMovies
            ? <ListarMovies movies={movies}/>
            : <ListarErrorBusqueda/>
    )
}