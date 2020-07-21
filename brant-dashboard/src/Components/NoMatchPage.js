import React from 'react'
import Title from './Others/Title'
import { Link } from '@material-ui/core'

export default function NoMatchPage(props) {
    return (
        <div>
            <div className="container mx-auto">
                <Title sectionTitle="Página não encontrada!!!"/>
                <div className="row mx-auto">
                    <div className="col-md-12 mx-auto">
                    <button className="btn btn-brant-color" onClick={()=>{props.history.goBack()}}>Voltar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
