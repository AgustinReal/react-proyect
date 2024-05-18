import { useState } from "react"
import { AddNote } from "../services/service_firebase";
import {time, ValidatorInputText} from "./funciones"



export function InputText()
{
    const [text, setText] = useState("");
    
    const errorText = ValidatorInputText(text);

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if(text.trim() === "") return;
        const timeAux = time();
        AddNote(text, timeAux, "Note", "");
        setText("");
    };


    return (
        <form action="" 
        onSubmit={handleSubmit}
        >
            <section className="container">

                <label className="" htmlFor="txtTextInput" name="">Write your note</label>
                <input type="text" id="txtTextInput" name="" placeholder="Note..." value={text} onChange={ eventInput => setText(eventInput.target.value)} required/>

                <p>{errorText}</p>

                <button type="sudmit">Add</button>

            </section>
        </form>
    )
    
}