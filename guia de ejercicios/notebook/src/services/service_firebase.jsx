import { collection, addDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase/firebaseConfig";

export async function AddNote(text, time, collectionAux, category="")
{
    try 
    {
        const noteRef = collection(db, collectionAux);
        console.log("Colección de notas:", noteRef);

        let docRef; 

        if (category === "") {
            docRef = await addDoc(noteRef, {
                text: text,
                time: time,
            });
        } 
        else 
        {
            docRef = await addDoc(noteRef, {
                text: text,
                time: time,
                category: category
            });
        }

        console.log("Nota agregada con ID:", docRef.id);
    } 
    catch (error)
    {
        console.error("Error al agregar la nota:", error);
    }
}

export async function updateNoteCategory(idNote, category, collection)
{
    try 
    {
        // Referencia al documento que se va a actualizar
        const noteRef = doc(db, collection, idNote);

        // Actualiza solo el campo de la categoría del documento
        await updateDoc(noteRef, {
            category: category
        });

        console.log("Categoría de la nota actualizada exitosamente en la base de datos.");
        return true; 
    } 
    catch (error) 
    {
        console.error("Error al actualizar la categoría de la nota en la base de datos:", error);
        return false; 
    }
}

