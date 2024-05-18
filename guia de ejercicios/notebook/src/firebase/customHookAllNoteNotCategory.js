import {db} from "../firebase/firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

export function useGetAllNotesNotCategory()
{
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);

    
    useEffect(() => {
        let unsubscribe = () =>{};
        
        const fetchNotes = async () => {
            try {
                unsubscribe = onSnapshot(query(collection(db, "Note"), orderBy("time", "asc")), (snapshot) => {
                   const updatedNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                   setNotes(updatedNotes);
                   setLoading(false);
               });
            } 
            catch (error) 
            {
                console.error("Error fetching notes:", error);
                setLoading(false);
            }
        }

        fetchNotes();

        return () => {
            if (unsubscribe)
            {
                unsubscribe();
            }
        };
    }, []);

    return { notes, loading };
}