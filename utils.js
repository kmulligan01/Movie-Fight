//set keypress so api calls don't cap out for each key press - aka "debouncing"
const debounce = (func, delay = 1000) =>{
    let timeoutId;
    //return All args in this function using spread-EX: (...args)
    return (...args) => {
        if (timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() =>{
            func.apply(null, args);
        }, delay);
    };
};