import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import GroupedChart from "@/pages/ScoMo/components/GroupedChart";
import StateClassCharts from "@/pages/ScoMo/components/StateClassChart";
import ScatteredChart from "@/pages/ScoMo/components/ScatteredChart";
import Text from "antd/es/typography/Text";
import {Card} from 'antd';
import TagCloud from './components/TagCloud';

const months = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

function convert(raw) {
  const groupedData = []
  const stateClass = []
  const scatteredData = []
  const all_tags = {}

  Object.keys(raw).forEach(k => {
    if(k.startsWith('_')) return

    stateClass.push({
      state: k,
      'percentage of middle & upper class': raw[k].find(el => !!el['percentage of middle&upper class'])['percentage of middle&upper class']
    })

    const stateData = {}
    raw[k].forEach(mData => {

      mData?.common_tag?.forEach?.(tag => {
        if(typeof all_tags[tag] !== 'number')
          all_tags[tag] = 1;
        else{
          all_tags[tag] = all_tags[tag]+1;
        }
      })

      stateData[months[mData.month-1]]=( parseFloat(mData.negative_rate) * 100 )
      if(mData.negative_rate && mData['percentage of middle&upper class'])
        scatteredData.push({
          state: k,
          rich: parseFloat(mData['percentage of middle&upper class'].replace('%')),
          negative_rate: parseFloat(mData.negative_rate * 100),
        })
    })

    groupedData.push({
      ...stateData,
      name: k
    })
  })
  const allTagsArray = Object.keys(all_tags).map(tag => ({
    x: tag,
    category: tag,
    value: all_tags[tag]
  }))
  return [groupedData, stateClass, scatteredData, allTagsArray];
}

const SCOMO: React.FC<{}> = () => {

  const data = require('./mockData').mockData

  const [processedData, stateClass, scatteredData, allTagsArray] = convert(data);
  return (
    <PageHeaderWrapper title="#ScoMo" >

      <Card title="Monthly tweets negative rate grouped by state" style={{marginBottom: 32}}>
        <Text>Higher negative rate indicates greater disapproval towards Scott Morrison </Text>
        <Text>This chart is integrative, you may click state names underneath to toggle visibility of its data.</Text>
        <GroupedChart data={processedData}/>
      </Card>

      <Card title="Percentage of middle & upper class for each state" style={{marginBottom: 32}}>
        <StateClassCharts data={stateClass}/>
      </Card>

      <Card title="Scatter plot of middle & upper class rate (x-axis) vs tweet negative rate (y-axis) for 09/2019 ~ 05/2020" style={{marginBottom: 32}}>
        <ScatteredChart data={scatteredData}/>
      </Card>

      <Card title="Common tags associated with Scott Morrison" style={{marginBottom: 32}}>
        {console.log(allTagsArray)}
        <TagCloud data={allTagsArray}/>
      </Card>

    </PageHeaderWrapper>
  );
};

export default SCOMO;
