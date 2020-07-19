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

export const setToken = (success) =>{
    localStorage.setItem('token',success.token); 

    currentUserSubject.next(success.user);
    localStorage.setItem('currentUser', JSON.stringify(success.user));

    return true;
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
