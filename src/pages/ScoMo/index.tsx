import React, {useEffect, useState} from 'react';
import {PageHeaderWrapper, PageLoading} from '@ant-design/pro-layout';
import GroupedChart from "@/pages/ScoMo/components/GroupedChart";
import StateClassCharts from "@/pages/ScoMo/components/StateClassChart";
import ScatteredChart from "@/pages/ScoMo/components/ScatteredChart";
import Text from "antd/es/typography/Text";
import {Card, Tabs} from 'antd';
import TagCloud from './components/TagCloud';
import axios from 'axios'
import {serverAddress} from "@/utils/utils";
import HeatMap from "@/pages/ScoMo/components/HeatMap";
const TabPane = Tabs.TabPane
const months = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

function convert(raw) {
  const groupedData = []
  const groupedDataPositive = []
  const stateClass = []
  const scatteredData = []
  const all_tags = {}
  const monthly_tags = {}

  Object.keys(raw).forEach(k => {
    if(k.startsWith('_')) return

    stateClass.push({
      state: k,
      'percentage of middle & upper class': parseFloat(raw[k].find(el => !!el['percentage of middle&upper class'])['percentage of middle&upper class'].replace('%'))
    })

    const stateData = {}
    const stateDataPositive = {}
    raw[k].forEach(mData => {

      mData?.common_tag?.forEach?.(tagRaw => {
        const [tag, num] = tagRaw
        if(typeof all_tags[tag] !== 'number')
          all_tags[tag] = num;
        else{
          all_tags[tag] += num;
        }
      })
      mData?.common_tag?.forEach?.((tagRaw: string) => {
        const [tag, num] = tagRaw
        if(typeof monthly_tags?.[mData.month]?.[tag] !== 'number'){
          monthly_tags[mData.month]= {};
          monthly_tags[mData.month][tag] = num || 0;
        }
        else{
          monthly_tags[mData.month][tag] += num;
        }
      })
      stateData[months[mData.month-1]]=( parseFloat(mData.negative_rate) * 100 )
      stateDataPositive[months[mData.month-1]]=( parseFloat(mData.positive_rate) * 100 )
      if(mData.negative_rate && mData['percentage of middle&upper class'])
        scatteredData.push({
          state: k,
          rich: parseFloat(mData['percentage of middle&upper class'].replace('%')),
          negative_rate: parseFloat(mData.negative_rate * 100),
          positive_rate: parseFloat(mData.positive_rate * 100),
        })
    })

    groupedData.push({
      ...stateData,
      name: k
    })
    groupedDataPositive.push({
      ...stateDataPositive,
      name: k
    })
  })
  const allTagsArray = Object.keys(all_tags).map(tag => ({
    x: tag,
    category: tag,
    value: all_tags[tag]
  }))

  const monthlyTagsComputed = {} ;
  Object.keys(monthly_tags).forEach( month => {
    const arr = Object.keys(all_tags).map(tag => ({
      x: tag,
      category: tag,
      value: all_tags[tag]
    }));

    monthlyTagsComputed[month] = arr

  })

  return [groupedData, stateClass, scatteredData, allTagsArray, monthlyTagsComputed, groupedDataPositive];
}

const SCOMO: React.FC<{}> = () => {
  const [data, setData] = useState<any>([])
  useEffect(()=>{
    axios.get(`${serverAddress}/api/scomo`).then((res) => {
      setData(convert(res.data))
    }).catch(console.log)

  },[])
  const [processedData, stateClass, scatteredData, allTagsArray, monthlyTagsComputed, groupedDataPositive] = data;
  return (
    <PageHeaderWrapper title="#ScoMo" >
      {
        data.length < 1 ? <PageLoading /> :
          <>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Negative Rates" key="1">
                <Card title="Monthly tweets negative rate grouped by state" style={{marginBottom: 32}}>
                  <Text>Higher negative rate indicates greater disapproval towards Scott Morrison </Text>
                  <Text>This chart is integrative, you may click state names underneath to toggle visibility of its data.</Text>
                  <GroupedChart data={processedData}/>
                </Card>

                <Card title="Scatter plot of middle & upper class rate (x-axis) vs tweet negative rate (y-axis) for 09/2019 ~ 05/2020" style={{marginBottom: 32}}>
                  <ScatteredChart data={scatteredData}/>
                </Card>
              </TabPane>
              <TabPane tab="Positive Rates" key="2">
                <Card title="Monthly tweets positive rate grouped by state" style={{marginBottom: 32}}>
                  <Text>Higher positive rate indicates greater approval towards Scott Morrison </Text>
                  <Text>This chart is integrative, you may click state names underneath to toggle visibility of its data.</Text>
                  <GroupedChart data={groupedDataPositive}/>
                </Card>

                <Card title="Scatter plot of middle & upper class rate (x-axis) vs tweet negative rate (y-axis) for 09/2019 ~ 05/2020" style={{marginBottom: 32}}>
                  <ScatteredChart data={scatteredData} isPositive/>
                </Card>
              </TabPane>
            </Tabs>

            <Card title="Percentage of middle & upper class for each state (Aurin)" style={{marginBottom: 32}}>
              <StateClassCharts data={stateClass}/>
            </Card>
            <Card title="Common tags associated with Scott Morrison for 09/2019 ~ 05/2020" style={{marginBottom: 32}}>
              <Tabs defaultActiveKey="0">
                <TabPane tab="All" key="0">
                  <TagCloud data={allTagsArray}/>
                </TabPane>
                <TabPane tab="September" key="9">
                  <TagCloud data={monthlyTagsComputed[9]}/>
                </TabPane>
                <TabPane tab="October" key="10">
                  <TagCloud data={monthlyTagsComputed[10]}/>
                </TabPane>
                <TabPane tab="November" key="11">
                  <TagCloud data={monthlyTagsComputed[11]}/>
                </TabPane>
                <TabPane tab="December" key="12">
                  <TagCloud data={monthlyTagsComputed[12]}/>
                </TabPane>
                <TabPane tab="January" key="1">
                  <TagCloud data={monthlyTagsComputed[1]}/>
                </TabPane>
                <TabPane tab="February" key="2">
                  <TagCloud data={monthlyTagsComputed[2]}/>
                </TabPane>
                <TabPane tab="March" key="3">
                  <TagCloud data={monthlyTagsComputed[3]}/>
                </TabPane>
                <TabPane tab="April" key="4">
                  <TagCloud data={monthlyTagsComputed[4]}/>
                </TabPane>
                <TabPane tab="May" key="5">
                  <TagCloud data={monthlyTagsComputed[5]}/>
                </TabPane>
              </Tabs>
            </Card>
          </>
      }
      {/*<Card title="Location of #ScoMo tweets" style={{marginBottom: 32}}>*/}
      {/*  <HeatMap/>*/}
      {/*</Card>*/}
    </PageHeaderWrapper>
  );
};

export default SCOMO;
