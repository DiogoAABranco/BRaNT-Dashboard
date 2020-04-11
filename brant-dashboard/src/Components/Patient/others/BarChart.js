import React, { Component } from 'react'
import { VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme } from 'victory';

//pass data by props of the state
    const data = [
        {domain: "Memória", value: 100},
        {domain: "Atenção", value: 90},
        {domain: "Linguagem", value: 32},
        {domain: "Interpretação", value: 54},
        {domain: "Perceção visual", value: 23}
      ];
class BarChart extends Component {
  render(){
      return (
          
          <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          horizontal={true}
          animate={{
              duration: 2000,
              onLoad: { duration: 500 }
            }}
          height ={250}  
          width = {600}
          padding={{ left: 100, top: 20, right: 20, bottom: 20 }}
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

