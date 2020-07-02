import React, {useState} from 'react'
import {  VictoryChart,
    VictoryLine,
    VictoryLabel,
    VictoryScatter,
    VictoryGroup,
    VictoryTooltip,
    VictoryAxis,
    VictoryVoronoiContainer } from 'victory';

export default function SessionsChart({dataCharts,labelScoreSelected}) {

    const sharedAxisStyles = {
        tickLabels: {
          fontSize: 13
        },
        axisLabel: {
          padding: 39,
          fontSize: 13,
          fontStyle: "italic"
        }
      };

    if(dataCharts.length == undefined ) return (<div></div>);
    return (

        <VictoryChart 
            height={300} width={1000}
            containerComponent={<VictoryVoronoiContainer/>}
            domainPadding={{ x: 25 }}
            padding={{ top: 70, bottom: 50, right: 100, left: 100 }}
            
            >
            <VictoryGroup
                labels={({ datum }) => "Sessão "+datum.x+":\n valor: " + datum.y+"\n Data: " + datum.z}
                labelComponent={
                <VictoryTooltip
                    style={{ fontSize: 10 }}
                />}
                data={dataCharts}
            >
            <VictoryScatter
            size={({ active }) => active ? 5 : 3} />
                
                <VictoryLine />
            </VictoryGroup>
            <VictoryAxis
                tickCount={dataCharts.length}
                label="Sessões"
                style={sharedAxisStyles}
            />
            <VictoryAxis
            dependentAxis
            label={labelScoreSelected}
            style={sharedAxisStyles}
        />
        </VictoryChart>

)
    
    
}
