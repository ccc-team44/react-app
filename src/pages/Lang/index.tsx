import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Tabs, Card, Row, Switch, Alert } from 'antd';
import axios from 'axios';
import LangCountPieChart from '@/pages/Lang/components/LangCountPieChart';
import { serverAddress } from '@/utils/utils';
import { mockData } from '@/pages/Lang/mock';
import HorizontalBarChart from '@/pages/Lang/components/HorizontalBarChart';
import styles from './index.less';

const { TabPane } = Tabs;
const sorter = (a, b) => (a.value > b.value ? -1 : a.value < b.value ? 1 : 0);

const OverallPie = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [top5, setTop5] = useState<any[]>([]);
  const [others, setOthers] = useState<any[]>([]);
  const [sum, setSum] = useState<number>(0);

  useEffect(() => {
    axios.get(`${serverAddress}/api/lang-count`).then((res) => {
      const sorted = res.data?.sort(sorter);
      const s = sorted.reduce((acc: number, x: { value: number }) => acc + x.value, 0);
      setSum(s);
      setTop5(sorted.slice(0, 5));
      const next10 = sorted.slice(5, 10);
      const rest = sorted.slice(10);
      const sumRest = rest.reduce((acc: number, x: { value: number }) => acc + x.value, 0);
      setOthers([
        ...next10,
        {
          key: 'rest',
          value: sumRest,
        },
      ]);

      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin spinning={loading} size="large" />
      </div>
    );

  return <LangCountPieChart data={top5} others={others} sum={sum} />;
};

const StateDetails = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${serverAddress}/api/lang`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const [filterOn, setFilterOn] = useState<boolean>(false)
  if (loading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin spinning={loading} size="large" />
      </div>
    );

  return (
    <>
      {
        !filterOn ? <Alert message="Showing all language" type="success" /> : <Alert message="Excluding English and Other" type="warning" />
      }
      <Switch checked={filterOn} onChange={setFilterOn} />

      <Tabs defaultActiveKey="1">
        <TabPane tab="Victoria" key="1">
          <HorizontalBarChart data={data.Victoria} filterOn={filterOn}/>
        </TabPane>
        <TabPane tab="New South Whales" key="2">
          <HorizontalBarChart data={data['New South Wales']}  filterOn={filterOn}/>
        </TabPane>
        <TabPane tab="Queensland" key="3">
          <HorizontalBarChart data={data.Queensland}  filterOn={filterOn}/>
        </TabPane>
        <TabPane tab="South Australia" key="4">
          <HorizontalBarChart data={data['South Australia']}  filterOn={filterOn}/>
        </TabPane>
        <TabPane tab="Western Australia" key="5">
          <HorizontalBarChart data={data['Western Australia']}  filterOn={filterOn}/>
        </TabPane>
        <TabPane tab="Northern Territory" key="6">
          <HorizontalBarChart data={data['Northern Territory']}  filterOn={filterOn}/>
        </TabPane>
        <TabPane tab="Tasmania" key="7">
          <HorizontalBarChart data={data.Tasmania}  filterOn={filterOn}/>
        </TabPane>
        <TabPane tab="Australian Capital Territory" key="8">
          <HorizontalBarChart data={data['Australian Capital Territory']}  filterOn={filterOn}/>
        </TabPane>
      </Tabs>
    </>
  );
};

export default () => {
  return (
    <PageHeaderWrapper content="Tweets Language" className={styles.main}>
      <Card title="Overall tweet language" style={{ marginBottom: 32 }}>
        <OverallPie />
      </Card>
      <Card
        title="Twitter vs Aurin language data grouped by state"
        style={{ marginBottom: 32 }}
      >
        <StateDetails />
      </Card>
    </PageHeaderWrapper>
  );
};
