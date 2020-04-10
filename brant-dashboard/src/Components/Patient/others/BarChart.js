import React, { Component } from 'react'
import { VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme } from 'victory';


    const data = [
        {domain: 1, value: 13000},
        {domain: 2, value: 16500},
        {domain: 3, value: 14250},
        {domain: 4, value: 19000}
      ];
class BarChart extends Component {
  
    
    
render(){


    return (
        
        <VictoryChart
        // adding the material theme provided with Victory
        theme={VictoryTheme.material}
        domainPadding={20}
        horizontal={true}
        animate={{
            duration: 2000,
            onLoad: { duration: 500 }
          }}
        height ={250}  
        width = {600}
        padding={{ left: 100, top: 20, right: 20, bottom: 60 }}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Memória", "Atenção", "Linguagem", "Memória"]}
          
          
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

