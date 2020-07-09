import baseUrl from '../../Config/config'


export const login = user => {
    
    return  fetch(`${baseUrl}login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        })
            .then(res => {
                localStorage.setItem('usertoken',res.data.token);
            })
            .catch(console.log); 
}