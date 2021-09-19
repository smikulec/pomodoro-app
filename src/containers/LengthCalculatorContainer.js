export const decrementLength = (length) => {
    const decreasedLength = length - 60 > 60 ? length - 60 : 60;
    return decreasedLength;
}
    
export const incrementLength = (length) => {
    const increasedLength = length + 60 <= 60 * 60 ? length + 60 : 60 * 60;
    return increasedLength;   
}


