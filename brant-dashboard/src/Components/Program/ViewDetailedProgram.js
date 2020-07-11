import React, { Component } from 'react'
import baseUrl from '../../Config/config'
import Title from '../Others/Title'
import CardsRow from './CardsRow';
import ListSessions from './ListSessions'
import {Link} from 'react-router-dom'
import ActivitiesNextSession from '../Session/ActivitiesNextSession'
import DialogEditByStep from './DialogEditByStep';
import SimpleSnackbar from '../Others/SimpleSnackBar'
import { tokenHeader } from '../../Config/configToken'



export default class ViewDetailedProgram extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           patientID:this.props.match.params.id,
            program:[],
            change:true
            
        }
        this.updateSessions = this.updateSessions.bind(this);
        this.handleSimulateResults = this.handleSimulateResults.bind(this);
    }
    abortController = new AbortController();

    componentDidMount(){
    
        this.handleApiCall ();
    }

    handleApiCall () {
        //api call for a specific patient
        fetch(`${baseUrl}training-program/${this.state.patientID}`,{headers:tokenHeader()},{signal: this.abortController.signal })
            .then(res => res.json())
            .then(data => {
                this.setState({program:data,change:true});
                console.log("json",data);
        
            })
            .catch((error) => {
                console.error('Error:', error);
                
            });      
            return () => this.abortController.abort(); 
    }

    
 
    updateSessions (sessions){
 
        this.setState(prevState => ({
            ...prevState,
            program: {
                ...prevState.program,
                plannedSessions: sessions,
                n_sessions:sessions.length
            }
             
        }))
        
        
        
    }

    handleSimulateResults(){
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(`${baseUrl}simulate-program/${this.state.program.id}`,{headers:tokenHeader()},{ signal: signal })
        .then(res => res.json())
        .then((data) => {

            console.log(data);
            this.handleApiCall();
            
            
        })
        .catch(console.log);
        
        return () => abortController.abort(); 
        
    }

    render() {
       
        if(this.state.program.length !== 0 && this.state.change === true)
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
                        <button className="btn btn-brant-color" onClick={ () => {this.props.history.push(`/programs/results/training-program/${this.state.program.id}`)}}>Resultados</button>

                    </div>
                </div>

                <div className="row p-2 ">
                    <div className="col-md-12 mt-5">
                        <ListSessions history={this.props.history} sessions={this.state.program.sessions} updateSessions={this.updateSessions} goTo={(id) => {this.props.history.push(`/programs/view-detailed-program/${id}`)}}/>
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
