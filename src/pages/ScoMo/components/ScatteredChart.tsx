import React from "react";
import {Axis, Chart, Geom, Legend, Tooltip} from "bizcharts";


const ScatteredChart = ({data, isPositive=false}) => {
  const scale = isPositive ?
    {
      positive_rate: {
        alias:'Positive rate %'
      },
      rich: {
        alias:'Middle & upper class %'
      }
    }:{
    negative_rate: {
      alias:'Negative rate %'
    },
    rich: {
      alias:'Middle & upper class %'
    }
  }
  return (
    <div>
      <Chart height={400} data={data} forceFit scale={scale}>
        <Tooltip
          showTitle={false}
          crosshairs={{
            type: "cross"
          }}
          itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/>{value}</li>"
        />
        <Axis name="rich" title/>
        <Axis name={isPositive ? "positive_rate": "negative_rate"} title/>
        <Legend />
        <Geom
          type="point"
          position={isPositive ? "rich*positive_rate" : "rich*negative_rate"}
          color="state"
          opacity={0.65}
          shape="circle"
          size={4}
          tooltip={[
            isPositive ? "state*rich*positive_rate" : "state*rich*negative_rate",
            (state, rich , rate) => {
              return {
                name: state,
                value: `${rich  }% mid & upper class, ${  rate  }% ${isPositive? ' positive' : ' negative'}`
              };
            }
          ]}
        />
      </Chart>
    </div>
  )
}

export default ScatteredChart
