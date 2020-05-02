import {EventEmitter} from "events"

//fire an event when store changes
//component will be notify

class UserStore extends EventEmitter{
    constructor(){
        super();
        this.users = [
            {
                id:"0",
                name:"Primeiro0 Nome Apelido",
                age:29,
                clinicalInfo:[
                    {description:"Nova descrição de procedimento", date:"05/04/2020", type:"clinicalProcedure"},
                    {description:"Nova descrição de edicação", date:"09/11/2019", type:"medication"}
                ]
            },
            {
                id:"1",
                name:"Primeiro1 Nome Apelido",
                age:25,
            },
            {
                id:"2",
                name:"Primeiro2 Nome Apelido",
                age:40,
            },
            {
                id:"3",
                name:"Primeiro Nome Apelido",
                age:21,
            },
          /*  {
                id:"55",
                name:"Primeiro Nome Apelido",
                age:"22",
            }
            {
                id:"66",
                name:"Primeiro Nome Apelido",
                age:"25",
            },{
                id:"77",
                name:"Primeiro Nome Apelido",
                age:"22",
            },
            {
                id:"88",
                name:"Primeiro Nome Apelido",
                age:"25",
            }*/
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