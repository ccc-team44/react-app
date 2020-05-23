import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Tabs } from 'antd';
import styles from './index.less';
import NationalRetweetMapComponent from "@/pages/RetweetMap/components/NationalRetweetMapComponent";
import StateMapComponent from "@/pages/RetweetMap/components/StateMapComponent";
const TabPane = Tabs.TabPane
export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper content="Australian Data" className={styles.main}>
      <div style={{ paddingTop: 0, textAlign: 'center' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="States" key="1">
            <NationalRetweetMapComponent/>
          </TabPane>
          <TabPane tab="Victoria" key="2">
            <StateMapComponent/>
          </TabPane>
        </Tabs>

      </div>
    </PageHeaderWrapper>
  );
};
