import "../components/app.css";
import { useCatImage } from "./customHook";
import { useFactRandom } from "./customHookFactRandom";
import { OtroComponente } from "./otro";

export function App()
{
    const { fact, RefreshfactRandom} = useFactRandom();
    const { img } = useCatImage({fact});
    
    const handleClick = async () =>{
        RefreshfactRandom()
    }
    
    return(
        <main>
            <h1>Prueba de Gatitos</h1>
            <button onClick={handleClick}>New Fact</button>
            <section className="container">
                {fact && <p>{fact}</p>}
                {img && <img src={img} alt="imagen ramdon cat"/>}
            {/* <OtroComponente/> */}
            </section>
        </main>
    );
    
}
