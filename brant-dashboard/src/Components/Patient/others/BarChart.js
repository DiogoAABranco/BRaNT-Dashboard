import React, { Component } from 'react'
import { VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme } from 'victory';

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
      
class BarChart extends Component {
  render(){
      return (
          
          <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={15}
          horizontal={true}
          animate={{
              duration: 2000,
              onLoad: { duration: 500 }
            }}
          height ={250}  
          width = {600}
          padding={{ left: 150, top: 20, right: 20, bottom: 20 }}
        >
          <VictoryAxis
            tickFormat={data.domain}
          />
      
          <VictoryBar
          style={{
              data: {
              fill: "#802d3d",
            
              },
          }}
            data={data}
            x="domain"
            y="value"
          />
        </VictoryChart>
      )
      }
}
export default BarChart

