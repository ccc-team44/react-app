import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import HeatMapComponent from "@/pages/HeatMap/components/HeatMapComponent";
import {mockData} from "./mock";
import {HeatMapItem} from "@/pages/HeatMap/data";

const mapStyles = {
  "londonCycle": "mapbox://styles/mapbox/light-v9",
    "light": "mapbox://styles/mapbox/light-v9",
    "dark": "mapbox://styles/mapbox/dark-v9",
    "basic": "mapbox://styles/mapbox/basic-v9",
    "outdoor": "mapbox://styles/mapbox/outdoors-v10"
}


export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<HeatMapItem[]>([]);
  useEffect(() => {
    const timer = setTimeout(()=> {
      setData(mockData)
      setLoading(false)
    },2000)

    return () => clearTimeout(timer)
  }, []);
  return (
    <PageHeaderWrapper content="It's heating up！" className={styles.main}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        {loading ? <Spin spinning={loading} size="large" /> : <HeatMapComponent data={data} mapStyles={mapStyles} />}
      </div>
    </PageHeaderWrapper>
  );
};
