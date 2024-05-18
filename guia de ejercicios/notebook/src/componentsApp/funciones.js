
export const time = () =>{
        
    const currentDate = new Date();

    // Formatear la fecha en "dd/mm/aaaa"
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // El mes es devuelto de 0 a 11, por eso se suma 1
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    // Formatear la hora en "hh:mm:ss"
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Combinar la fecha y la hora en un solo string
    const dateTimeString = `${formattedDate} ${formattedTime}`;

    return dateTimeString;
}

export const ValidatorInputText = (text) => { 
    if(text.length > 40) return "your text is so big, pls text smaller than 40.";
}