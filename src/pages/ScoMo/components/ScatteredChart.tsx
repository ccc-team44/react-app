import React from "react";
import {Axis, Chart, Geom, Legend, Tooltip} from "bizcharts";

const scale = {
  negative_rate: {
    alias:'Negative rate %'
  },
  rich: {
    alias:'Middle & upper class %'
  }
}
const ScatteredChart = ({data, isPositive=false}) =>
  (
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
          <Axis name="positive_rate" title/>
          <Legend />
          <Geom
            type="point"
            position="rich*positive_rate"
            color="state"
            opacity={0.65}
            shape="circle"
            size={4}
            tooltip={[
              "state*rich*positive_rate",
              (state, rich , negative_rate) => {
                return {
                  name: state,
                  value: `${rich  }% mid & upper class, ${  negative_rate  }% positive`
                };
              }
            ]}
          />
        </Chart>
      </div>
    )

export default ScatteredChart
