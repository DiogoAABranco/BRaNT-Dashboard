import React, { Component } from 'react'
import baseUrl from '../../Config/config'
import TablePrograms from './TablePrograms'
import Title from '../Others/Title'
import { Link } from 'react-router-dom';
import { tokenHeader } from '../../Config/configToken'

/*----------------------------------------------------------------
it receives all program currently active from all the patients
and health professional can manage and edit the active programs
------------------------------------------------------------------ */


export class Programs extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            //recomended activities for the user
            programs:[]
        }
       
    }

    abortController = new AbortController();
      
    handleApiCall () {
        //recommended activities for the user
        fetch(`${baseUrl}training-program`,{headers:tokenHeader()},{signal: this.abortController.signal })
            .then(res => res.json())
            .then(data => {
            
                let activePrograms = [];
                data.forEach(program => {
                    if(program.isActive === 1){
                        activePrograms.push(program);
                    }
                });
                this.setState({programs:activePrograms});
            })
    }
    componentDidUpdate(){
        //this.handleApiCall();

    }

    componentDidMount() {
        this.handleApiCall();
    }

    componentWillUnmount(){
        this.abortController.abort();
    }
    
    render() {
        return (
            <div>
                <div className="p-2 d-flex justify-content-between">
                        <Title sectionTitle="Programas de treino ativos"/>
                    </div>
                <div className="row p-0 m-0">
                    <div className="col-sm-12 p-2">
                        <TablePrograms data={this.state.programs} goTo={(id) => {this.props.history.push(`/dashboard/programs/view-detailed-program/${id}`)}}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Programs
