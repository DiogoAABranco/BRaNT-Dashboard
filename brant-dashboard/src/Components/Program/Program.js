import React, { Component } from 'react'


export class Program extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            activities:[]
        }
    }
    handleApiCall () {
        fetch("/api/activities")
            .then(res => res.json())
            .then(json => {
                this.setState({activities:json.activities});
                console.log(this.state.activities);
            })
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
