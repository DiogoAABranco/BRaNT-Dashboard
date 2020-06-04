import React, { Component } from 'react'
import TablePrograms from './TablePrograms'
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
                <div className="row p-0 m-0">
                    <div className="col-sm-12 p-2">
                        <TablePrograms data={this.state.programs}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Programs
