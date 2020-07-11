export const getToken = () =>{
    return localStorage.getItem('token');
}

export const setToken = (token) =>{
    localStorage.setItem('token',token); 
    return;
}

export const tokenHeader = () =>{
    return new Headers({
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
    });
}
