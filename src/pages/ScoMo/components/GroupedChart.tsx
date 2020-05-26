import React from 'react';
import {Axis, Chart, Geom, Legend, Tooltip} from 'bizcharts';
import DataSet from '@antv/data-set';


const GroupedChart = ({data} : {
  data: any
}) => {
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: "fold",
    fields: [ "September", "October", "November", "December","January", "February", "March", "April", "May"],
    key: "Month",
    value: "Negative Rate"
  });
  const  scale = {
    "Negative Rate": {
      alias: 'Positive Rate'
    }
  }
  return (
    <div>
      <Chart height={800} data={dv} forceFit scale={scale}>
        <Axis name="Month" />
        <Axis name="Negative Rate" title/>
        <Legend />
        <Tooltip
          crosshairs={{
            type: "y"
          }}
        />
        <Geom
          type="interval"
          position="Month*Negative Rate"
          color={"name"}
          adjust={[
            {
              type: "dodge",
              marginRatio: 1 / 32
            }
          ]}
        />
      </Chart>
    </div>
  );
};

export default GroupedChart;
