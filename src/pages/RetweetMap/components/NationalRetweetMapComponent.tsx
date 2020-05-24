import {
  LayerEvent,
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
  return newData;
}


function joinData(geodata: { type?: string; features: any; }, data: { [x: string]: {}; }) {
  const geoObj: any = {};
  geodata.features.forEach((feature: any) => {
    const { STATE_CODE } = feature.properties;
    geoObj[STATE_CODE] = feature.properties;
    const stateData = data[STATE_CODE] || {};
    feature.properties = {
      ...feature.properties,
      ...stateData,
    };
  });
  return geodata;
}

// @ts-ignore
const NationalRetweetMapComponent = React.memo(({data: rawData}) => {
  const [data, setData] = React.useState();
  const [popupInfo, setPopupInfo] = React.useState<{
    lnglat: number[];
    feature: any;
  }>();
  React.useEffect(() => {
    const fetchData = async () => {
      const {auStateJson} = await import('../australian-states')
      setData(joinData(auStateJson, converter(rawData)));
    };
    fetchData();
  }, []);

  function showPopup(args: any): void {
    setPopupInfo({
      lnglat: args.lngLat,
      feature: args.feature.properties,
    });
  }

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
        {popupInfo && (
          <Popup lnglat={popupInfo.lnglat}>
            <h3>{popupInfo.feature.STATE_NAME}</h3>
            <ul
              style={{
                margin: 0,
              }}
            >
              <li>retweet number: <strong>{popupInfo.feature['retweet number']}</strong></li>
              <li>tweets number:<strong>{popupInfo.feature['tweets number']}</strong></li>
              <li>freq of retweet:<strong>{popupInfo.feature['freq of retweet']}</strong></li>
              <li>percentage of middle & upper class:<strong>{popupInfo.feature['percentage of middle&upper class']}</strong></li>
              <li>median age of earner: <strong>{popupInfo.feature['median age of earner']}</strong></li>
            </ul>
          </Popup>
        )}
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
                'freq of retweet': {
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
              field: 'freq of retweet',
              values: [
                '#ffffff',
                '#7bddfd',
                '#43c3f4',
                '#099be2',
                '#0b6a98',
                '#095479',
                '#073e5a',
                '#041d2c'
              ]
            }}
            shape={{
              values: 'fill',
            }}
            style={{
              opacity: 1,
            }}
          >
            <LayerEvent type="mousemove" handler={showPopup} />
          </PolygonLayer>,
          <LineLayer
            key={'2'}
            source={{
              data,
            }}
            size={{
              values: 0.6,
            }}
            color={{
              values: '#aaa',
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
