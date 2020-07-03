import React, { Component } from 'react'
import baseUrl from '../../Config/config'
import Title from '../Others/Title'
import CardsRow from './CardsRow';
import ListSessions from './ListSessions'
import {Link} from 'react-router-dom'
import ActivitiesNextSession from '../Session/ActivitiesNextSession'
import DialogEditByStep from './DialogEditByStep';
import SimpleSnackbar from '../Others/SimpleSnackBar'



export default class ViewDetailedProgram extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           patientID:this.props.match.params.id,
            program:[]
            
        }
        this.onClickRemoveSession = this.onClickRemoveSession.bind(this);
        this.handleSimulateResults = this.handleSimulateResults.bind(this);
    }
    abortController = new AbortController();

    componentDidMount(){
    
        this.handleApiCall ();
    }

    handleApiCall () {
        //api call for a specific patient
        fetch(`${baseUrl}training-program/${this.state.patientID}`,{signal: this.abortController.signal })
            .then(res => res.json())
            .then(data => {
                this.setState({program:data});
                console.log("json",data);
        
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

    handleSimulateResults(){
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(`${baseUrl}simulate-program/${this.state.program.id}`,{ signal: signal })
        .then(res => res.json())
        .then((data) => {

            console.log(data);
            this.handleApiCall();
            
        })
        .catch(console.log);
        
        return () => abortController.abort(); 
        
    }

    render() {
       
        if(this.state.program.length !== 0)
        return (
            <div className="container-fluid">
                
                <Title sectionTitle={"Programa de treino: " + this.state.program.patient.name} />
                <CardsRow data={this.state.program}/>
                <ActivitiesNextSession session={this.state.program.sessions[0]} />

                <div className="row p-0 ml-2 d-flex justify-content-between">
                    <DialogEditByStep gameVariables={this.state.program.game_variables}/>
                    <div className="pt-2 pr-4">
                        <button className="btn btn-brant-color" onClick={ this.handleSimulateResults}>Simular Resultados</button>

                    </div>
                    <div className="pt-2 pr-4">
                        <button className="btn btn-brant-color" onClick={ () => {this.props.history.push(`/results/training-program/${this.state.program.id}`)}}>Resultados</button>

                    </div>
                </div>

                <div className="row p-2 ">
                    <div className="col-md-12 mt-5">
                        <ListSessions history={this.props.history} sessions={this.state.program.sessions} onClickRemoveSession={this.onClickRemoveSession} goTo={(id) => {this.props.history.push(`view-detailed-program/${id}`)}}/>
                    </div>
                </div>
 
            </div>
        )
        else 
        return(
            <div></div>
        )
    }
}
