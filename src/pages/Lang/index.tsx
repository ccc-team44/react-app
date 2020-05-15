import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import axios from "axios";
import {serverAddress} from "../../../config/config";
import LangCountPieChart from "@/pages/Lang/components/LangCountPieChart";

const sorter = (a,b) => a.value>b.value? -1: a.value < b.value? 1: 0

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [top10, setTop10] = useState<any[]>([]);
  const [rest, setRest] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${serverAddress}/api/lang-count`).then(res=> {
      console.log(data)
      setData(res.data)
      const sorted = res.data?.sort(sorter);
      setTop10(sorted.splice(0,10))
      setRest(sorted.splice(10))

      setLoading(false)
    })
  }, []);
  return (
    <PageHeaderWrapper content="Tweets Language" className={styles.main}>
      { loading ? <Spin spinning={loading} size="large" /> : <LangCountPieChart data={top10} others={rest}/>}
    </PageHeaderWrapper>
  );
};
