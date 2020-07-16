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
              duration: 500,
              onLoad: { duration: 100 }
            }}
          height ={350}  
          width = {500}
          padding={{ left: 150, top: 20, right: 20, bottom: 20 }}
        >
          <VictoryAxis
            tickFormat={data.domain}
          />
      
          <VictoryBar

          data={data} 
          labels={({ datum }) => datum.maxValue ? datum.value+"/"+datum.maxValue:datum.value}
          style={{
              data: {
              fill: "#802d3d",
              },
              labels: { fill: "#802d3d", fontSize: 16 }
          
          }}
         
            x="domain"
            y="value"
            labelComponent={<VictoryLabel dy={0} dx={10}/>}
          
          />
        </VictoryChart>
}
export default BarChart

