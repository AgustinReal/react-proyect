import {db} from "../firebase/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

export function useGetAllNotesCategory({category})
{
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        let unsubscribe;

        const fetchNotes = async () => {
            try {
                const q = query(collection(db, "Notes-category"), where("category", "==", category));
                
                unsubscribe = onSnapshot(q, (snapshot) => {
                    const notesSnapshot = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setNotes(notesSnapshot);
                    setLoading(false);
                });
            } 
            catch (error) 
            {
                console.error("Error fetching notes:", error);
                setLoading(false);
            }
        };

        fetchNotes();

        return () => {
            if (unsubscribe)
            {
                unsubscribe();
            }
        };
    }, [category]);


    return { notes, loading };
}   
