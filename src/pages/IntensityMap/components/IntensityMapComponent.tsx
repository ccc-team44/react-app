import * as React from 'react';
import { HeatmapLayer, MapboxScene, PointLayer } from '@antv/l7-react';
import { Spin } from 'antd';
import axios from 'axios'
import {generateRandomPoints} from "@/utils/randGeo";

const center = [144.9631, -37.8136] as [number, number];
const  IntensityMapComponent = () =>  {
  const [data, setData] = React.useState()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(()=>{
    // axios.get(
    //   'https://gw.alipayobjects.com/os/rmsportal/BElVQFEFvpAKzddxFZxJ.txt'
    // ).then((res) => {
    //   console.log(res.data)
    //   setData(res.data)
    //   setLoading(false)
    // })

      setData(generateRandomPoints({'lat':center[1], 'lng': center[0]}, 2000, 3000))
      setLoading(false)


  },[])
  return loading ? (
    <Spin />
  ) : (
    <MapboxScene
      map={{
        center,
        pitch: 0,
        style: 'dark',
        zoom: 15
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <PointLayer
        options={{
          autoFit: false,
        }}
        source={{
          data,
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat',
          },
        }}
        size={{
          values: 2,
        }}
        color={{
          value: '#080298'
        }}
        style={{
          opacity: 1,
        }}
      />
    </MapboxScene>
  );
}

export default IntensityMapComponent
