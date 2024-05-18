import {Link} from '../Link.jsx'

export function AboutPage() 
{
  return(
    <>
      <h1>About</h1>
      <div>
        <img src='https://cdn.discordapp.com/attachments/941212145532686346/1226383673516101773/IMG_20240406_142442920.jpg?ex=662491cc&is=66121ccc&hm=6bb63d8a5970f021c730c909700c4d35fa3a21384ce53bf213bbc37e18b71131&' alt="Foto de Agustin"/>
        <p>¡Hola! Me llamo Agustin Real y estoy creando un clon de React Router.</p>
      </div>
      <Link to={'/'}>Ir a la home</Link>
    </>
  )
}