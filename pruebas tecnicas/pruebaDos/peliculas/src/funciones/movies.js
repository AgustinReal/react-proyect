export const searchMovies = async({search}) => {
    const API_SEARCH_MOVIES = "http://www.omdbapi.com/?apikey=57084d90&s="

    console.log(search)
    console.log(API_SEARCH_MOVIES + search);
    
    if(search === "") return null;

    try 
    {
        const responde = await fetch(API_SEARCH_MOVIES + search)
        const json = await responde.json()
        const movies = json.Search


        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
          }))

    } 
    catch (e) 
    {
       throw new Error('Error al buscar la peli');
    }

}