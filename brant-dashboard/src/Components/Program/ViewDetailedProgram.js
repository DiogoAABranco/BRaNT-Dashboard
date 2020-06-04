import React, { Component } from 'react'
import Title from '../Others/Title'
import CardsRow from './CardsRow';

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
            }
        }
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

    render() {
        return (
            <div className="container-fluid">
                
                <Title sectionTitle={"Programa de treino de: " + this.state.program.patientName} />
                <CardsRow data={this.state.program}/>
                
            </div>
        )
    }
}
