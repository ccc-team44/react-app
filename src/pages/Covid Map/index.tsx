import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Tabs } from 'antd';
import styles from './index.less';
import CovidMapComponent from "@/pages/Covid Map/components/CovidMapComponent";
import StateMapComponent from "@/pages/Covid Map/components/StateMapComponent";
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
            <CovidMapComponent/>
          </TabPane>
          <TabPane tab="Victoria" key="2">
            <StateMapComponent/>
          </TabPane>
        </Tabs>

      </div>
    </PageHeaderWrapper>
  );
};
