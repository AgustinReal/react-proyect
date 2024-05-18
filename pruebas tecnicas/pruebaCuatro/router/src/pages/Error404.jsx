import { Link } from "../Link";

export default function Page404(){
    return(
        <>
        <div>
        <h1>Error 404</h1>
        <img className="imgError" src="https://cdn.dribbble.com/users/605899/screenshots/4144886/pikabu.gif" 
        alt="gif error 404 ojitos" />
        </div>
        <Link to={'/'}>Volvel al home</Link>
        </>
    )
}