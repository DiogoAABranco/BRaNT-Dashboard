import baseUrl from '../../Config/config'
import {setToken} from '../../Config/configToken'




export const login = (user) => { 

    let formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);
    
    return  fetch(`${baseUrl}login`,{
       body: formData,
       method: "post",
        })
        .then(res => res.json())
        .then(res =>{
            console.log(res);
            if(res.success){
                setToken(res.success);
                return res.success.user;

            }
            else{
                return false;
            }
                       
        })
        .catch(console.log);  
}