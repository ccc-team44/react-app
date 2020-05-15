import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import axios from 'axios';
import LangCountPieChart from '@/pages/Lang/components/LangCountPieChart';
import { serverAddress } from '@/utils/utils';

const sorter = (a, b) => (a.value > b.value ? -1 : a.value < b.value ? 1 : 0);

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [top10, setTop10] = useState<any[]>([]);
  const [rest, setRest] = useState<any[]>([]);
  const [sum, setSum] = useState<number>(0);

  useEffect(() => {
    axios.get(`${serverAddress}/api/lang-count`).then((res) => {
      setData(res.data);
      const sorted = res.data?.sort(sorter);
      console.log(sorted);

      const s = sorted.reduce((acc: number, x: { value: number }) => acc + x.value, 0);
      setSum(s);
      setTop10(sorted.splice(0, 10));
      setRest(sorted.splice(10));

      setLoading(false);
    });
  }, []);
  return (
    <PageHeaderWrapper content="Tweets Language" className={styles.main}>
      {loading ? (
        <Spin spinning={loading} size="large" />
      ) : (
        <LangCountPieChart data={top10} others={rest} sum={sum} />
      )}
    </PageHeaderWrapper>
  );
};
