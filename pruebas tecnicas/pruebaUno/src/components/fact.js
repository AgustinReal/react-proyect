const API ='https://catfact.ninja/fact';

export const getNewFact = async () => {
   const responde = await fetch(API);
    const data = await responde.json();
    const { fact } = data;
    console.log(fact);
    return fact;
}
