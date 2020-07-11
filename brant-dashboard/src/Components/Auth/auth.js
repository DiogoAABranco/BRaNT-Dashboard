import baseUrl from '../../Config/config'
import {setToken} from '../../Config/configToken'
import { tokenHeader } from '../../Config/configToken'



export const login = user => { 

    let formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);
    
    return  fetch(`${baseUrl}login`,{
       body: formData,
       method: "post",
       headers:tokenHeader(),
        })
        .then(res => res.json())
        .then(res =>{
            console.log(res);
            if(res.success){
                setToken(res.success.token);
                return true;
            }
            else{
                return false;
            }
                       
        })
        .catch(console.log);  
}