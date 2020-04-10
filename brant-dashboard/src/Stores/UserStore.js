import {EventEmitter} from "events"

//fire an event when store changes
//component will be notify

class UserStore extends EventEmitter{
    constructor(){
        super();
        this.users = [
            {
                id:"11",
                name:"Luis1 Gonçalves",
                age:"22",
            },
            {
                id:"22",
                name:"Luis2 Gonçalves2",
                age:"25",
            },
            {
                id:"33",
                name:"Luis3 Gonçalves",
                age:"22",
            },
            {
                id:"44",
                name:"Luis4 Gonçalves2",
                age:"25",
            },
            {
                id:"55",
                name:"Luis3 Gonçalves",
                age:"22",
            },
            {
                id:"66",
                name:"Luis4 Gonçalves2",
                age:"25",
            },{
                id:"77",
                name:"Luis3 Gonçalves",
                age:"22",
            },
            {
                id:"88",
                name:"Luis4 Gonçalves2",
                age:"25",
            }
        ];     
    }
    createUser(name,age){
        const id = Date.now();
        this.users.push({
            id,
            name,
            age
        });
        this.emit("change");
    }
    getAll() {
        return this.users;
    }
}
const  userStore = new UserStore;
//criar user atraves do inspector
//window.UserStore = userStore;
export default userStore;