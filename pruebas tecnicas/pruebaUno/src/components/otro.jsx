import { useCatImage } from "./customHook";

export function OtroComponente (){
    const {img} = useCatImage({ fact: 'lola'});

    console.log(img);

    return(
        <>
            {img && <img src={img} alt="imagen ramdon de un gatito"/>}
        </>
        )
}