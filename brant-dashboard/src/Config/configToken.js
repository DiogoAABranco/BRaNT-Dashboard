import { BehaviorSubject } from 'rxjs';
import {useContext} from 'react'
import baseUrl from './config'
import { UserContext } from '../Components/UserContext'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const currentUser = currentUserSubject.asObservable();


export const checkAuth =  () => {
  
    if( getToken() !== null && currentUser  !== null ){
        return true;
    }
    return false;
}

export const getToken = () =>{
    return localStorage.getItem('token');
}

export const getUser = () =>{
    return JSON.parse(localStorage.getItem('currentUser'));
}

export const setToken = (token) =>{
    localStorage.setItem('token',token); 

    let user = null;

    fetch(`${baseUrl}details`,{
        method: "post",
        headers:new Headers({
            'Authorization': 'Bearer ' + token,
        }),
         })
         .then(res => res.json())
         .then(res =>{
             if(res.msg ==='success'){
                currentUserSubject.next(res.user);
                localStorage.setItem('currentUser', JSON.stringify(res.user));
                user = res.user;
                return" res.user";
             }
             else{
                console.log("impossible to store user");
                return false;
             }
                        
         })
         .catch(console.log);  
   
    return;
}

export const tokenHeader = () =>{
    return new Headers({
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json'
    });
}

export const logout = () =>{
    localStorage.removeItem('token'); 
    localStorage.removeItem('currentUser'); 
    currentUserSubject.next(null);
     
    return true;
}
