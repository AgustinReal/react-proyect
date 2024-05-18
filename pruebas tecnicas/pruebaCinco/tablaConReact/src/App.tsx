import { useEffect, useMemo, useRef, useState } from "react"
import { SortBy, type User } from "./types.d"
import { ListOfUsers } from "./components/ListOfUsers"
import { useInfiniteQuery } from '@tanstack/react-query'

const fetchUsers = async (page: number) =>{
  return await fetch(`https://randomuser.me/api/?results=10&seed=agustin&page=${page}`)
  .then(async res => {
    if(!res.ok) throw new Error("Error en la petición")// <- para atrapar errores de forma correcta.
    return await res.json()
  }) 
  .then(data => {
    const nextCursor = Number(data.info.page)

    return{
      users: data.results,
      nextCursor
    }
  })
}

/*
TanStack Query: Se utiliza para el manejo de administración de estados asincronicos
*/

function App() {
  //Necesita 2 parametros: 1ero la key
 const {isLoading, isError, data, refetch, hasNextPage } = useInfiniteQuery<{nextCursor: number, users: User[]}>(
    ['users'], // => la key dek info o la query
    async () => await fetchUsers(1), // => como traer la info
    {
      getNextPageParam: (lastPage,  pages) => {
        lastPage.nextCursor
      }
    }
  )
  
  const[showColors, setShowColors] = useState(false)
  const[sorting, setSorting] = useState<SortBy>(SortBy.NONE)

  // useRef => guarda un valor, que queremos que se comprata entre renderizados
  // pero que al cambiar, no vuelva a renderizar el componente. 

  const [filterCountry, setFilterCountry]= useState<string | null>(null)

  const[currentPage, setCurrentPage] = useState(1)


  const toggleColors = (event: any) =>{
    event.preventDefault()
    setShowColors(!showColors)
  }
  
  const toggleSortByCountry = (event: any) =>{
    event.preventDefault()
    const newSortingValue =  sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }


  //toSorted() es un nuevo metodo que devuelve un nuevo array. nota 10
  // const sortUsers = (users: User[]) => {
  //   return sortByCountry 
  //   ? users.toSorted((a: User, b: User) =>{
  //     return a.location.country.localeCompare(b.location.country)
  //   })
  //   : users
  // }
  // Otra forma: [...user] va ser una copia del array. nota: 7
  //  const sortedUsers = sortByCountry 
  // ? [...users].sort((a: User, b: User) =>{
  //   return a.location.country.localeCompare(b.location.country)
  // })
  // : users

  //filtro de usuarios por paises
  const filteredUsers = useMemo(() =>{
    return typeof filterCountry ==='string' && filterCountry.length > 0
    ? users.filter( (user: User) =>{
      return user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
    })
    :
    users
  }, [users, filterCountry])
    

  const sortedUsers = useMemo(() =>{
    console.log('estoy ordenando')

    if(sorting === SortBy.NONE) return filteredUsers

    if(sorting === SortBy.NAME)
    {
      return filteredUsers.toSorted(
        (a: User, b: User) => a.name.first.localeCompare(b.name.first)
      )
    }

    if(sorting === SortBy.LAST)
    {
      return filteredUsers.toSorted(
        (a: User, b: User) => a.name.last.localeCompare(b.name.last)
      )
    }

    if(sorting === SortBy.COUNTRY)
    {
      return filteredUsers.toSorted(
        (a: User, b: User) => a.location.country.localeCompare(b.location.country)
      )
    }

  }, [filteredUsers, sorting])
  
  const handlerDelete = (email : string) =>{
    // const filterUsers = users.filter((user: User) => user.email !== email)
    // setUsers(filterUsers)
  } 

  const handleReset = () =>{
   // setUsers(restedUsers.current)
  }

  const handleChangeSort = (sort: SortBy) =>{
    setSorting(sort)
  }

  return (
    <>
      <header>
      <h1>Prueba tecnica</h1>
      <div className="containerButtons">
        <button onClick={toggleColors}>{ showColors ? "No colorear filas" : "Colorear filas"}</button>
        <button onClick={toggleSortByCountry}>{sorting === SortBy.COUNTRY ? "No ordenar por paises" : "Ordenar por paises"} </button>
        <button onClick={handleReset}>Resetear estado</button>
        <input type="text" placeholder="filtro de pais" onChange={(e) => {
          e.preventDefault()
          setFilterCountry(e.target.value)
        }}/>
      </div>
      </header>
      <main>

      {users.length > 0 && 
        <ListOfUsers changeSorting={handleChangeSort} handlerDelete={handlerDelete} 
        showColors={showColors} users={sortedUsers} /> }

        {isLoading && <p> <strong>Cargando...</strong> </p>}

        {isError && <p> <strong>Ha habido un error.</strong> </p>}

        {!isError && users.length === 0 && <p> <strong>No hay usuarios.</strong> </p>}

        {!isLoading && !isError && <button onClick={() => setCurrentPage(currentPage +1)}>Cargar más resultados</button>}  
      </main>
    </>
  )
}

export default App
