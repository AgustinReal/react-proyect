import { useState } from "react";
import {useGetAllNotesCategory} from "../firebase/customHookAllNotes"

export function TablaDeNotasCategoria() {
    const [category, setCategory] = useState("Card"); 
    const {notes, loading} = useGetAllNotesCategory({category});

    const HandleSubmitCard = (event) => {
        event.preventDefault(); 
        setCategory("Card");
    };

    const HandleSubmitMemory = (event) => {
        event.preventDefault(); 
        setCategory("Memory");
    };

    const HandleSubmitInform = (event) => {
        event.preventDefault(); 
        setCategory("Inform");
    };

    if (loading) 
    {
        return <div>Loading...</div>;
    }

    if (!notes || notes.length === 0) 
    {
        return <div>No hay notas disponibles para esta categoría.</div>;
    }

    return (
        <div>
            <div className="row-buttons">
                <button className="btn-Card" onClick={ HandleSubmitCard }>Card</button>
                <button className="btn-Memory" onClick={ HandleSubmitMemory }>Memory</button>
                <button className="btn-Inform" onClick={ HandleSubmitInform }>Inform</button>
            </div>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>text</th>
                        <th>time</th>
                        <th>category</th>
                    </tr>
                </thead>
                <tbody>
                {notes.map((note, index) => (
                        <tr key={note.id}>
                            <td>{index + 1}</td>
                            <td>{note.text}</td>
                            <td>{note.time}</td>
                            <td>{note.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}