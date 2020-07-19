import React, { Component } from 'react'
import baseUrl from '../../Config/config'
import TablePrograms from '../Program/TablePrograms'
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
            programs:this.props.patient.training_programs
        }
       
    }

    componentDidMount() {

        let progTemp = this.state.programs;
        progTemp.forEach(element => {
            element.patient = this.props.patient;
        });
        
        this.setState({programs:progTemp});
    }
    
    render() {
        return (
            <div>
                <div className="p-2">
                    
                    <TablePrograms data={this.state.programs} goTo={(id) => {this.props.history.push(`/dashboard/programs/view-detailed-program/${id}`)}}/>
                    
                </div>
            </div>
        )
    }
}

export default Programs
