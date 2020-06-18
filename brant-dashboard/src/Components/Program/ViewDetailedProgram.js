import React, { Component } from 'react'
import Title from '../Others/Title'
import CardsRow from './CardsRow';
import ListSessions from './ListSessions'


export default class ViewDetailedProgram extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            program:{
                patientName:"",
                activities:[],
                daysOfTheWeek:[],
                nSessions:0,
                startDate:new Date(),
                plannedSessions:[]
            },
            
        }
        this.onClickRemoveSession = this.onClickRemoveSession.bind(this);
    }
    componentDidMount(){
        this.handleApiCall ();
    }
    handleApiCall () {
        //api call for a specific patient
        //only change "Paciente X" for pacient name or id or program id
        fetch("/api/program/Paciente X")
            .then(res => res.json())
            .then(json => {
                this.setState({program:json.program});
                console.log("json",this.state.program);
        
            })
            .catch((error) => {
                console.error('Error:', error);
                
            });      
    }
 

    onClickRemoveSession (e,session){
        let copyProgram = this.state.program;
        let newPlannedSessions = this.state.program.plannedSessions.filter(item => item !== session);
        copyProgram.plannedSessions = newPlannedSessions;
        this.setState({program:copyProgram});
    }
    render() {
        return (
            <div className="container-fluid">
                
                <Title sectionTitle={"Programa de treino de: " + this.state.program.patientName} />
                <CardsRow data={this.state.program}/>
                <ListSessions data={this.state.program.plannedSessions} onClickRemoveSession={this.onClickRemoveSession}/>

                
            </div>
        )
    }
}
