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
  const geoObj: any = {};
  geodata.features.forEach((feature: any) => {
    const { loc_pid } = feature.properties;
    geoObj[loc_pid] = feature.properties;
    const ncov = {
      confirmedCount: 100 * Math.random()
    };
    feature.properties = {
      ...feature.properties,
      ...ncov,
    };
  });
  console.log(geodata)
  return geodata;
}

const StateMapComponent = React.memo(function Map() {
  const [data, setData] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      const geoData = await  fetch(
        'https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/suburb-2-vic.geojson',
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
export default StateMapComponent
