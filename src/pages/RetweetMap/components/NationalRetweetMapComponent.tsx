import {
  LineLayer,
  MapboxScene,
  Marker,
  PolygonLayer,
  Popup,
} from '@antv/l7-react';
import * as React from 'react';


const stateCode = {
  "New South Wales": "0",
  "Victoria": "1",
  "Queensland": "2",
  "South Australia": "3",
  "Western Australia": "4",
  "Tasmania": "5",
  "Northern Territory": "6",
  "Australian Capital Territory": "7",
}

const converter = (raw) => {

  const newData = {}
  Object.keys(raw).forEach(k => {
    if(k.startsWith('_')) return
    newData[stateCode[k]] = raw[k]
  })
}


function joinData(geodata: any) {

  const data = converter(require('./mockData').mockData)

  const ncovDataObj: any = {
    "1": {
      confirmedCount: 1000*Math.random()
    },
    "2": {
      confirmedCount: 1000 * Math.random()
    },
    "3": {
      confirmedCount: 1000 * Math.random()
    },
    "4": {
      confirmedCount: 1000 * Math.random()
    },
    "5": {
      confirmedCount: 1000 * Math.random()
    },
    "6": {
      confirmedCount: 1000 * Math.random()
    },
    "7": {
      confirmedCount: 1000 * Math.random()
    },
  };

  const geoObj: any = {};
  geodata.features.forEach((feature: any) => {
    const { STATE_CODE } = feature.properties;
    geoObj[STATE_CODE] = feature.properties;
    const ncov = ncovDataObj[STATE_CODE] || {};
    feature.properties = {
      ...feature.properties,
      ...ncov,
    };
  });
  console.log(geodata)
  return geodata;
}

const NationalRetweetMapComponent = React.memo(function Map() {
  const [data, setData] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      const geoData = await  fetch(
        'https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/australian-states.json',
      ).then((d) => d.json());
      setData(joinData(geoData));
    };
    fetchData();
  }, []);
  return (
    <>
      <MapboxScene
        map={{
          center: [144.9631, -37.8136],
          pitch: 0,
          style: 'dark',
          zoom: 1,
        }}
        style={{
          width: '100%',
          height: '80vh',
        }}
      >
        {data && [
          <PolygonLayer
            key={'1'}
            options={{
              autoFit: true,
            }}
            source={{
              data,
            }}
            scale={{
              values: {
                confirmedCount: {
                  type: 'quantile',
                },
              },
            }}
            active={{
              option: {
                color: '#0c2c84',
              },
            }}
            color={{
              field: 'confirmedCount', // 填充颜色
              values: ['#f7fcf0','#e0f3db','#ccebc5','#a8ddb5','#7bccc4','#4eb3d3','#2b8cbe','#08589e'].reverse()
            }}
            shape={{
              values: 'fill',
            }}
            style={{
              opacity: 1,
            }}
          />,
          <LineLayer
            key={'2'}
            source={{
              data,
            }}
            size={{
              values: 0.6,
            }}
            color={{
              values: '#aaa', // 描边颜色
            }}
            shape={{
              values: 'line',
            }}
            style={{
              opacity: 1,
            }}
          />,
        ]}
      </MapboxScene>
    </>
  );
});
export default NationalRetweetMapComponent
