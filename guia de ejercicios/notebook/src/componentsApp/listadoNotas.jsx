import Fuse from "fuse.js";
import { useState } from "react";
import { AddNote } from "../services/service_firebase";
import {time} from "./funciones";
import { useGetAllNotesNotCategory } from '../firebase/customHookAllNoteNotCategory.js';

export function MyComponent() {

    const { notes, loading } = useGetAllNotesNotCategory();
    const [queryAux, setQuery] = useState("");

    // Crear un array de objetos con las propiedades 'text' y 'time' de cada nota.
    const dataForFuse = notes.map(note => ({
        id: note.id, 
        text: note.text,
        time: note.time
    }));

    // Crear un array de objetos que representan las claves para la búsqueda.
    const keys = ["text", "time"];

    // Configurar fuse con las claves y los datos
    const fuse = new Fuse(dataForFuse, {
        keys: keys
    });

    const results = fuse.search(queryAux);

    const charactersResult = queryAux ? results.map(result => result.item) : dataForFuse;

    const handleSearch = ({currentTarget = {}}) => {
        const {value} = currentTarget;
        setQuery(value);
    };

    const handleSubmitMemory = (event, text) => {
        event.preventDefault(); 
        const timeAux = time();
        AddNote(text, timeAux, "Notes-category", "Memory");
    };

    const handleSubmitInform = (event, text) => {
        event.preventDefault(); 
        const timeAux = time();
        AddNote(text, timeAux, "Notes-category", "Inform");
    };

    const handleSubmitCard = (event, text) => {
        event.preventDefault(); 
        const timeAux = time();
        AddNote(text, timeAux, "Notes-category", "Card");
    };

    if (loading) 
    {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-list">
            <label htmlFor="searchInput">Search </label>
            <input type="text" id="searchInput" value={queryAux} onChange={handleSearch} placeholder="Search..."/>
            <h1>My Notes</h1>
            <ul>
                {charactersResult.map(note => (
                    <li key={note.id}>{note.text} - {note.time} 
                    <button className="buttonMemory" onClick={(event) => handleSubmitMemory(event, note.text)}>Memory</button> 
                    <button className="buttonInform" onClick={(event) => handleSubmitInform(event, note.text)}>Inform</button> 
                    <button className="buttonCard" onClick={(event) => handleSubmitCard(event, note.text)}>Card</button></li>
                ))}
            </ul>
        </div>
    );
}