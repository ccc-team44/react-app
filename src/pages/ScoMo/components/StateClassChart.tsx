import React from "react";
import {Axis, Chart, Geom, Tooltip} from "bizcharts";


const StateClassCharts = ({data} : {
  data: any
}) => {
  const cols = {
    'percentage of middle & upper class': {
      alias: 'Middle & upper class %'
    }
  };
  return (
    <div>
      <Chart height={400} data={data} scale={cols} forceFit>
        <Axis name="state" />
        <Axis name="percentage of middle & upper class" title/>
        <Tooltip
        />
        <Geom type="interval" position="state*percentage of middle & upper class" />
      </Chart>
    </div>
  );
};

export default StateClassCharts;
