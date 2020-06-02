import React, { Component } from 'react'


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
            </div>
        )
    }
}

export default Program
