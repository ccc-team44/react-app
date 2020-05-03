import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import CovidMapComponent from "@/pages/Covid Map/components/CovidMapComponent";

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper content="Australian Data" className={styles.main}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
        <CovidMapComponent/>
      </div>
    </PageHeaderWrapper>
  );
};
