import React, { Component } from 'react'
import Title from '../Others/Title'
import CardsRow from './CardsRow';
import ListSessions from './ListSessions'


export default class ViewDetailedProgram extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           patientID:this.props.match.params.id,
            program:[]
            
        }
        this.onClickRemoveSession = this.onClickRemoveSession.bind(this);
    }
    abortController = new AbortController();

    componentDidMount(){
    
        this.handleApiCall ();
    }

    handleApiCall () {
        //api call for a specific patient
        //only change "Paciente X" for pacient name or id or program id
        fetch(`http://localhost:8000/api/training-program/${this.state.patientID}`,{signal: this.abortController.signal })
            .then(res => res.json())
            .then(data => {
                this.setState({program:data});
                console.log("json",this.state.program);
        
            })
            .catch((error) => {
                console.error('Error:', error);
                
            });      
            return () => this.abortController.abort(); 
    }
 

    onClickRemoveSession (e,session){
        let copyProgram = this.state.program;
        let newPlannedSessions = this.state.program.plannedSessions.filter(item => item !== session);
        copyProgram.plannedSessions = newPlannedSessions;
        this.setState({program:copyProgram});
    }
    render() {
        if(this.state.program.length !== 0)
        return (
            <div className="container-fluid">
                
                <Title sectionTitle={"Programa de treino: " + this.state.program.patient.name} />
                <CardsRow data={this.state.program}/>
                <ListSessions sessions={this.state.program.sessions} onClickRemoveSession={this.onClickRemoveSession} goTo={(id) => {this.props.history.push(`view-detailed-program/${id}`)}}/>
 
            </div>
        )
        else 
        return(
            <div></div>
        )
    }
}
