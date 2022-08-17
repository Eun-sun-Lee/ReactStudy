export const getStringDate = (date) => { //input-box에 default로 값 전달 위함. 
    return date.toISOString().slice(0,10); //2022-08-16
}; 