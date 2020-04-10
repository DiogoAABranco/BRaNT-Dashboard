import React from 'react'
import Title from '../Others/Title'
import FieldProfile from './others/FieldProfile'


function SocioDemoInfo(props){

    return <div>
        <Title sectionTitle="Informação socio demográfica"/>
        
        <div className="container-fluid pt-2">

            <FieldProfile fieldName="Nome" name="Nome nome nome nomeL" />

            <FieldProfile fieldName="Idade" name="50" />

            <FieldProfile fieldName="Género" name="Feminino" />

            <FieldProfile fieldName="Telefone" name="999999999" />

        </div>
    </div>
}

export default SocioDemoInfo