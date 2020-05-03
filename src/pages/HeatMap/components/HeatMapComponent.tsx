import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import {HeatMapItem} from "@/pages/HeatMap/data";

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiY2NjNDRhMiIsImEiOiJjazlwZmQ5NDIwYWZsM2ZxeHFxanpsZ2RxIn0.Gx0JHRDrwh60diKisu08SQ'
});

const mapStyle = {
  flex: 1,
  height: '60vh',
  minHeight: 600
};

export interface Props {
  // tslint:disable-next-line:no-any
  onStyleLoad?: (map: any) => any;
}

const layerPaint = {
  'heatmap-weight': {
    property: 'priceIndicator',
    type: 'exponential',
    stops: [[0, 0], [5, 2]]
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  'heatmap-intensity': {
    stops: [[0, 0], [5, 1.2]]
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(33,102,172,0)',
    0.25,
    'rgb(103,169,207)',
    0.5,
    'rgb(209,229,240)',
    0.8,
    'rgb(253,219,199)',
    1,
    'rgb(239,138,98)',
    2,
    'rgb(178,24,43)'
  ],
  // Adjust the heatmap radius by zoom level
  'heatmap-radius': {
    stops: [[0, 1], [5, 50]]
  }
};
const center = [144.9631, -37.8136] as [number, number];

export default ({data, mapStyles:styles} : {
  data: HeatMapItem[]
  mapStyles: any
}) => {

  return <>
    <Map
      style={styles.dark}
      center={center}
      containerStyle={mapStyle}
    >
      <Layer type="heatmap" paint={layerPaint}>
        {data.map((el: any, index: number) => (
          <Feature key={index} coordinates={el.latlng} properties={el} />
        ))}
      </Layer>
    </Map>
  </>
}
