import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Tabs } from 'antd';
import styles from './index.less';
import axios from 'axios';
import LangCountPieChart from '@/pages/Lang/components/LangCountPieChart';
import { serverAddress } from '@/utils/utils';
import {mockData} from "@/pages/Lang/mock";
import HorizontalBarChart from "@/pages/Lang/components/HorizontalBarChart";
const { TabPane } = Tabs;
const sorter = (a, b) => (a.value > b.value ? -1 : a.value < b.value ? 1 : 0);

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [top5, setTop5] = useState<any[]>([]);
  const [others, setOthers] = useState<any[]>([]);
  const [sum, setSum] = useState<number>(0);

  useEffect(() => {
    axios.get(`${serverAddress}/api/lang-count`).then((res) => {
      setData(res.data);
      const sorted = res.data?.sort(sorter);
      console.log(sorted);

      const s = sorted.reduce((acc: number, x: { value: number }) => acc + x.value, 0);
      setSum(s);
      setTop5(sorted.slice(0, 5));
      const next10 = sorted.slice(5, 10)
      const rest = sorted.slice(10)
      const sumRest = rest.reduce((acc: number, x: { value: number }) => acc + x.value, 0);
      setOthers([...next10, {
        key: 'rest',
        value: sumRest
      }]);

      setLoading(false);
    });
  }, []);
  return (
    <PageHeaderWrapper content="Tweets Language" className={styles.main}>
      {loading ? (
        <Spin spinning={loading} size="large" />
      ) : (
        <LangCountPieChart data={top5} others={others} sum={sum} />
      )}

      <Tabs defaultActiveKey="1">
        <TabPane tab="Victoria" key="1">
          <HorizontalBarChart data={mockData['Victoria']}/>
        </TabPane>
        <TabPane tab="New South Whales" key="2">
          <HorizontalBarChart data={mockData['New South Wales']}/>
        </TabPane>
        <TabPane tab="Queensland" key="3">
          <HorizontalBarChart data={mockData['Queensland']}/>
        </TabPane>
        <TabPane tab="South Australia" key="4">
          <HorizontalBarChart data={mockData['South Australia']}/>
        </TabPane>
        <TabPane tab="Western Australia" key="5">
          <HorizontalBarChart data={mockData['Western Australia']}/>
        </TabPane>
        <TabPane tab="Northern Territory" key="6">
          <HorizontalBarChart data={mockData['Northern Territory']}/>
        </TabPane>
        <TabPane tab="Tasmania" key="7">
          <HorizontalBarChart data={mockData['Tasmania']}/>
        </TabPane>
        <TabPane tab="Australian Capital Territory" key="8">
          <HorizontalBarChart data={mockData['Australian Capital Territory']}/>
        </TabPane>
      </Tabs>
    </PageHeaderWrapper>
  );
};
