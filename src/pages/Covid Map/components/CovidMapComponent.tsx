import {
  LineLayer,
  MapboxScene,
  Marker,
  PolygonLayer,
  Popup,
} from '@antv/l7-react';
import * as React from 'react';
import ReactDOM from 'react-dom';

function joinData(geodata: any) {
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

const CovidMapComponent = React.memo(function Map() {
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
          style: 'blank',
          zoom: 1,
        }}
        style={{
          position: 'absolute',
          background:'#fff', // 地图背景色
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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
              values: [
                '#732200',
                '#CC3D00',
                '#FF6619',
                '#FF9466',
                '#FFC1A6',
                '#FCE2D7',
              ].reverse()
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
export default CovidMapComponent
