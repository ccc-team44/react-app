import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import HeatMapComponent from "@/pages/HeatMap/components/HeatMapComponent";
import axios from "axios";
import {HeatMapItem} from "@/pages/HeatMap/data";
import { serverAddress } from '@/utils/utils';

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
    axios.get(`${serverAddress}/api/scomo-location`).then(res=> {
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
