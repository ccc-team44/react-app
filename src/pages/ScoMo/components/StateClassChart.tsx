import React from "react";
import {Axis, Chart, Geom, Tooltip} from "bizcharts";

const StateClassCharts = ({data} : {
  data: any
}) => {
  console.log(data)
  const cols = {
    'percentage of middle & upper class': {
      tickInterval: 20
    }
  };
  return (
    <div>
      <Chart height={400} data={data} scale={cols} forceFit>
        <Axis name="state" />
        <Axis name="percentage of middle&upper class" />
        <Tooltip
        />
        <Geom type="interval" position="state*percentage of middle & upper class" />
      </Chart>
    </div>
  );
};

export default StateClassCharts;
