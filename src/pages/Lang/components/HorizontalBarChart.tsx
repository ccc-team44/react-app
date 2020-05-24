import React from "react";
import {Axis, Chart, Coord, Geom, Legend, Tooltip} from "bizcharts";
import DataSet from "@antv/data-set";

const sorter = (a: { twitter: number; }, b: { twitter: number; }) => a.twitter < b.twitter? 1 : a.twitter > b.twitter ? -1 : 0


export default ({data: dataRaw, filterOn=false}) => {
  const data = dataRaw?.filter?.((d: { label: string; }) => filterOn ===false || (d.label!=='english' && d.label!=='other'))
    .map(d => ({...d, twitter: parseFloat(d.twitter),aurin: parseFloat(d.aurin)}))
    .sort(sorter)?? []
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: "fold",
    fields: ["twitter", "aurin"],
    key: "type",
    value: "value"
  });
  return (
    <div>
      <Chart height={1200} data={dv} forceFit>
        <Legend />
        <Coord transpose scale={[1, -1]} />
        <Axis
          name="label"
          label={{
            offset: 12
          }}
        />
        <Axis name="value" position={"right"} />
        <Tooltip />
        <Geom
          type="interval"
          position="label*value"
          color={"type"}
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
}
