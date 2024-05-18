import { useState, useEffect } from "react";

// custom hooks
/*
    Advertencia: Los custom hook son cajas negras, no deben tener el nombre de la funcion relacionado a lo q hace por adentro
    porque este puede cambiar su funcionalidad (si hace un fetch, este puede cambiar por otra cosa) finalizando no puede tener el
    nombre useFetchCatImagen.

    nota: Se pasa el parametro fact asi: {fact} Porque ?

    1ero: Es un parametro nombrado, ya que obliga que el nombre sea ese.
    2do: El para es extensible porque esta en formato { json } y si en el futuro queremos agregar mas parametros, 
    esto no tendra en cuenta el orden y no habrá poblemas. 
*/ 
export function useCatImage({ fact })
{
    const [img, setImg] = useState();
    //seach img
    useEffect(()=>{
        if(!fact) return
        const firstFact = fact.split(' ', 3);
    
        console.log(firstFact);
    
        fetch(`https://cataas.com/cat/cute/says/${firstFact}`)
        .then(res =>{
            console.log(res);
            const  url  = res.url;
            setImg(url);
        })
    }, [fact])

    return { img };
}