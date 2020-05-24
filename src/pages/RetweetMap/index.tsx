import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {useEffect, useState} from 'react';
import {Tabs, Spin} from 'antd';
import NationalRetweetMapComponent from "@/pages/RetweetMap/components/NationalRetweetMapComponent";
import axios from "axios";
import {serverAddress} from "@/utils/utils";
import styles from './index.less';

const {TabPane} = Tabs
export default () => {
  const [data, setData] = useState<any>()
  useEffect(()=>{
    axios.get(`${serverAddress}/api/retweet`).then((res) => {
      setData(res.data)
    }).catch(console.log)

  },[])
  return (
    <PageHeaderWrapper content="Australian Data" className={styles.main}>
      <div style={{ paddingTop: 0, textAlign: 'center' }}>
        {
          !data? <Spin/> :
          <Tabs defaultActiveKey="1">
            <TabPane tab="Frequency of Retweet" key="1">
              <NationalRetweetMapComponent data={data}/>
            </TabPane>
            {/* <TabPane tab="Victoria" key="2"> */}
            {/*  <StateMapComponent/> */}
            {/* </TabPane> */}
          </Tabs>
        }
      </div>
    </PageHeaderWrapper>
  );
};
