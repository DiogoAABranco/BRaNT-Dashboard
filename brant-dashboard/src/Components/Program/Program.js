import React, { Component } from 'react'
import MaterialTable from 'material-table'


/*----------------------------------------------------------------
it receives all program currently active from all the patients
and health professional can manage and edit the active programs
------------------------------------------------------------------ */


export class Program extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            //recomended activities for the user
            programs:[]
        }
    }
    handleApiCall () {
        //recommended activities for the user
        fetch("/api/programs")
            .then(res => res.json())
            .then(json => {
                this.setState({programs:json.programs});
            })
            console.log("test: " + this.state.programs);
    }

    componentDidMount() {
        this.handleApiCall();
      }
    
    render() {
        return (
            <div>
                <h1>Programa</h1>
                <div className="row p-0 m-0">
                    <div className="col-sm-12 p-2">
                    <MaterialTable
                   
                   options={{
                       search: false,
                       draggable: false,
                       headerStyle: {
                           backgroundColor: '#752938',
                           color:"white"
                       }
                     }}
                   columns={[
                       { title: 'Paciente', field: 'patientName' },
                       { title: 'Data de início', field: 'startDate'},
                       { title: 'Número de sessões', field: 'nSessions'}
                   ]}
                   data={this.state.programs}
                   title="Programas de treino ativos" 
               />
                    </div>
                
                </div>
                
                
            </div>
        )
    }
}

export default Program
