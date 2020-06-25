import React, { Component } from 'react'
import Title from '../Others/Title'
import ActivitiesView from './ActivitiesView'
import DetailsPlanView from './DetailsPlanView'
import SimpleDialog from '../Others/SimpleDialog'
import { withRouter } from 'react-router-dom';



class TrainingSession extends Component{
    constructor(props){
        super(props);
        this.state = {
            patientID:this.props.location.patientID,
            patientName:this.props.location.name,
            games:[{id:0, activityName:"Atividade 1", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[{key:"parametro 1",value:1},{key:"parametro 2",value:2},{key:"parametro 3",value:3}]},
            {id:1, activityName:"Atividade 2", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[{key:"parametro 1",value:1},{key:"parametro 2",value:2},{key:"parametro 3",value:3}]},
            {id:2, activityName:"Atividade 3", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[{key:"parametro 1",value:1},{key:"parametro 2",value:2},{key:"parametro 3",value:3}]},
            {id:3, activityName:"Atividade 4", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[]},
            {id:4, activityName:"Atividade 5", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[]},
            {id:5, activityName:"Atividade 6", description:"Descrição:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",parameters:[]}],
            activities:[],
            dificulty:0,
            startDate:new Date(),
            nSessions:0,
            daysOfTheWeek:[],
            daysSelectBox:[{id:0, value:"Domingo",isChecked:false},
                {id:1, value:"Segunda-feira",isChecked:false},
                {id:2, value:"Terça-feira",isChecked:false},
                {id:3, value:"Quarta-feira",isChecked:false},
                {id:4, value:"Quinta-feira",isChecked:false},
                {id:5, value:"Sexta-feira",isChecked:false},
                {id:6, value:"Sábado",isChecked:false}],
            programComplete:false,
            errorCreatingProgram:false
        }
        //necessary bind to get context of "this.setState"
        this.onClickRemoveActivity = this.onClickRemoveActivity.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangenSessions = this.handleChangenSessions.bind(this);
        this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
    }

    abortController = new AbortController();
      
    handleApiCall () {
        //recommended activities for the user
        fetch(`http://localhost:8000/api/patients/${this.state.patientID}/recommended-games`,{signal: this.abortController.signal })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({activities:data});
            });
            return () => this.abortController.abort(); 
    }

    componentDidMount() {
        this.handleApiCall();
    }

    componentWillUnmount(){
        this.abortController.abort();
    }

    handleSubmit = () => {
        if(this.state.daysOfTheWeek.length == 0)
            return alert("Definir dia/s das sessões");

        if( this.state.nSessions == 0)
            return alert("Definir número de sessões");
        let trainingPlan = {
            patientName:this.state.patientName,
            activities:this.state.activities,
            startDate:this.state.startDate,
            nSessions:this.state.nSessions,
            daysOfTheWeek:this.state.daysOfTheWeek,
            isComplete:false,
            plannedSessions: this.createSessionsObject()
        };
        fetch('/api/program', {
                method: 'POST', 
                headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(trainingPlan),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({programComplete:true})
                
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({errorCreatingProgram:true})
            });
            //this.props.history.push('/programs');
        // console.log(trainingPlan);

    }
    handleChangeStartDate = (date) => {
        this.setState({startDate:date});
    }
    handleChangenSessions = (e) =>{
        let value = parseInt(e.target.value);
        this.setState({nSessions:value});
    }

    //remove activity from the recommended list
    onClickRemoveActivity (e,activity){
        let temp = this.state.activities.filter(item => item !== activity);
        this.setState({activities:temp});
    }
    handleSliderChange = (event, newValue) => {
        this.setState({dificulty:newValue});
    }
    handleChangeCheckBox = (e) => {
        let days = this.state.daysSelectBox;
        let daysOfTheWeek = [];

        days.forEach(day => {
            if(day.id == e.target.value)
                day.isChecked = e.target.checked;

            if(day.isChecked)
                daysOfTheWeek.push(day.id);
        })
        this.setState({daysSelectBox:days}); 
        this.setState({daysOfTheWeek:daysOfTheWeek}); 
    }
  
    //return days of the sessions
    setDaysOfSessions = () => {
       
        //day selected to start the plan
        let currentDate = this.state.startDate;
    
        //days of the week sunday-0 monday-1 tuesday-2
        let days = this.state.daysOfTheWeek;
    
        //number of sessions for this program
        let nSessions = this.state.nSessions;
        
        let sessionsDates = [];
        let i = 1;
        
        while(sessionsDates.length < nSessions){
    
            let tempDate = new Date();
            tempDate.setDate(currentDate.getDate() + i);
            
            for(var j = 0; j < days.length; j++){
                if(tempDate.getDay() == days[j] ){
        
                sessionsDates.push(tempDate);
                console.log(tempDate.getDay());
                }
            }
            i++;
        }
        return sessionsDates;
        console.log(sessionsDates);
    }

    createSessionsObject = () => {
        let sessions = [];
        let dates = this.setDaysOfSessions();

        dates.map((date, index) => {
            let session = {id:index, activities:this.state.activities, date:date,isDone:false};
            sessions.push(session);
        });
        return sessions;
    }

    render(){
        if(this.state.activities.length !== 0)
        return <div>
                {this.state.programComplete?
                <SimpleDialog title="Informação" information={"Programa de treino criado para o paciente: "+this.state.patientName} link='/programs'/>:
                <div>
                <Title sectionTitle={"Plano de treino - " + this.state.patientName }/>
                <ActivitiesView 
                    state={this.state} 
                    onClickRemoveActivity={this.onClickRemoveActivity}/>

                <DetailsPlanView 
                    startDate = {this.state.startDate} 
                    daysSelectBox = {this.state.daysSelectBox}
                    handleChangeStartDate = {this.handleChangeStartDate}
                    handleChangenSessions = {this.handleChangenSessions}
                    handleChangeCheckBox = {this.handleChangeCheckBox} />

                <div className="row justify-content-md-center m-0">
                    <button className="btn btn-brant-color" onClick={this.handleSubmit}>Submeter treino</button>
                </div>
                </div>}
                {this.state.errorCreatingProgram?
                <SimpleDialog title="Informação" information={"Não foi possível criar o programa de treino para: "+this.state.patientName}/>:
                null}
                

            </div>
        else
        return <div></div>
    }
}
export default withRouter(TrainingSession)