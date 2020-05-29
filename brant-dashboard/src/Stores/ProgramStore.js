
class ProgramStore{
    constructor(){
        this.program = {
            id:0,
            startDate:null,
            endDate:null,
            weekDays:null,
            sessions:[],


        }
    }
  
}
//criar user atraves do inspector

const  programStore = new ProgramStore;
window.UserStore = programStore;

export default programStore;