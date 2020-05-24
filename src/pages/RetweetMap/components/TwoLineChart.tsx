import React from "react";
import {Axis, Chart, Geom, Tooltip} from "bizcharts";


const cols = {
  'freq': {
    min: 0,
    range:[0,1],
    alias: 'freq of retweet'
  },
  'percent': {
    range: [0, 1],
    alias: 'percent of middle and upper class'
  }
};

export default ({data : rawData}) => {

  const data = Object.keys(rawData)?.filter(el => !el.startsWith('_')).map(state => {
    console.log(rawData[state])
    const d = rawData[state];
    // eslint-disable-next-line consistent-return
    return ({
      ...d,
      state: state,
      freq: parseFloat(d['freq of retweet']),
      percent: parseFloat(d['percentage of middle&upper class'])
    })
  })?.sort((a,b) => a.percent < b.percent? -1 : a.percent > b.percent? 1 : 0)

  return (
    <div>
      <Chart height={window.innerHeight} data={data} scale={cols} forceFit>
        <Tooltip
          showTitle={false}
          crosshairs={{
            type: "cross"
          }}
          itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/>{value}</li>"
        />
        <Axis name="freq" title/>
        <Axis name="percent" title/>
        <Geom
          type="line"
          position="percent*freq"
          opacity={0.65}
          shape="circle"
          size={4}
          tooltip={[
            "state*percent*freq",
            (state,percent,freq) => {
              return {
                name: state,
                value: `Frequency of retweet ${freq  }, Percentage of middle & upper class ${  percent  }%`
              };
            }
          ]}
        />
        <Geom
          type="point"
          position="percent*freq"
          opacity={0.65}
          shape="circle"
          size={4}
        />
        <Tooltip
          crosshairs={{
            type: "y"
          }}
        />
      </Chart>
    </div>
  )
}
