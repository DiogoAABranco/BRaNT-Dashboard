import React, { Component } from 'react'
import { VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme,VictoryLabel } from 'victory';


      
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
          
          
         
          data={data} 
          labels={({ datum }) => datum.value}
          style={{
              data: {
              fill: "#802d3d",
            
              },
              labels: { fill: "white" }
          
          }}
         
            x="domain"
            y="value"
            labelComponent={<VictoryLabel dy={0} dx={-30}/>}
          
          />
        </VictoryChart>
}
export default BarChart

