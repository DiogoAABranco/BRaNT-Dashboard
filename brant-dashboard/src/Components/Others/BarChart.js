import React, { Component } from 'react'
import { VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme } from 'victory';


      
function BarChart(props){
      let data =  props.data;
      return <VictoryChart
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
}
export default BarChart

