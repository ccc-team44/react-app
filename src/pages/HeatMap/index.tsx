import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import HeatMapComponent from "@/pages/HeatMap/components/HeatMapComponent";
import axios from "axios";
import {HeatMapItem} from "@/pages/HeatMap/data";

const mapStyles = {
  "londonCycle": "mapbox://styles/mapbox/light-v9",
    "light": "mapbox://styles/mapbox/light-v9",
    "dark": "mapbox://styles/mapbox/dark-v9",
    "basic": "mapbox://styles/mapbox/basic-v9",
    "outdoor": "mapbox://styles/mapbox/outdoors-v10"
}

const serverAddress = process.env.NODE_ENV === 'production' ? `http://${window.location.host}:8002` : 'http://localhost:8002';
export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<HeatMapItem[]>([]);
  useEffect(() => {
    axios.get(`${serverAddress}/tweets`).then(res=> {
      console.log(res.data)
      setData(res.data)
      setLoading(false)
    })
  }, []);
  return (
    <PageHeaderWrapper content="It's heating up！" className={styles.main}>
      <div style={{ paddingTop: 20, textAlign: 'center' }}>
        {loading ? <Spin spinning={loading} size="large" /> : <HeatMapComponent data={data} mapStyles={mapStyles} />}
      </div>
    </PageHeaderWrapper>
  );
};
