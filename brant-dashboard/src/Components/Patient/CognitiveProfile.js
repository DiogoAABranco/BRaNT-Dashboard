import React from 'react'
import Title from '../Others/Title'
import BarChart from '../Others/BarChart'

//pass data by props of the state
const data = [
    {domain: "Memória", value: 100},
    {domain: "Atenção", value: 90},
    {domain: "Linguagem", value: 32},
    {domain: "Nomeação", value: 54},
    {domain: "Visuo-espacial", value: 23},
    {domain: "Orientação", value: 45},
    {domain: "Evocação diferida", value: 90},
    {domain: "Abstração", value: 93}
  ];
function CognitiveProfile(props){
    
    return <div>
        <Title sectionTitle="Perfil Cognitivo"/>

        <div>
            <BarChart data={data}></BarChart>

        </div>
    </div>
    }

export default CognitiveProfile