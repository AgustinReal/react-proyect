import { SortBy, User } from "../types.d"

interface Props{
 users : User[]
 showColors : boolean
 handlerDelete: (email: string) => void
 changeSorting: (sort: SortBy) => void
}
export function ListOfUsers({ changeSorting, users, showColors, handlerDelete}: Props, )
{

    return(
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
                    <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
                    <th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
               {
                users.map((user: User, index: number) =>{
                    const backgroundColor = index % 2 == 0 ? '#333' : "#555"
                    const color = showColors ? backgroundColor : 'transparent'

                    return(
                        <tr key={user.login.uuid} style={{backgroundColor: color}}>
                            <td><img src={user.picture.thumbnail} alt="" /></td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td>
                                <button onClick={() =>handlerDelete(user.email)}>Borrar</button>
                            </td>
                        </tr>
                    )
                })
               }
            </tbody>
        </table>
    )
}