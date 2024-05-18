import { useEffect, useState } from "react";

import { getNewFact } from "./fact";

export const useFactRandom = () => {
    const [fact, setFact] = useState("fact cat");

    //seach fact
    const RefreshfactRandom = () => {
        getNewFact().then(newFact => setFact(newFact));
    }

    useEffect(RefreshfactRandom, []);

    return {fact, RefreshfactRandom};
}