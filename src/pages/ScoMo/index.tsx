import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import DataSet from '@antv/data-set';
import GroupedChart from "@/pages/ScoMo/components/GroupedChart";
import StateClassCharts from "@/pages/ScoMo/components/StateClassChart";
import ScatteredChart from "@/pages/ScoMo/components/ScatteredChart";
import Title from 'antd/lib/typography/Title';
import Text from "antd/es/typography/Text";
import { Card, Space } from 'antd';


const data = [
  { label: '0.1', 放款应还本金: 2800, 价格: 2800, 收益: 2260, 总收益率: 2 },
  { label: '0.2', 放款应还本金: 1800, 价格: 1800, 收益: 1300, 总收益率: 3 },
  { label: '0.3', 放款应还本金: 950, 价格: 950, 收益: 900, 总收益率: 5 },
  { label: '0.4', 放款应还本金: 500, 价格: 500, 收益: -390, 总收益率: 1 },
  { label: '0.5', 放款应还本金: 170, 价格: 170, 收益: 100, 总收益率: 3 },
  { label: '0.6', 放款应还本金: 170, 价格: 170, 收益: 100, 总收益率: 3 },
  { label: '0.7', 放款应还本金: 170, 价格: 170, 收益: -100, 总收益率: 3 },
  { label: '0.8', 放款应还本金: 170, 价格: 170, 收益: 100, 总收益率: 3 },
  { label: '0.9', 放款应还本金: 170, 价格: 170, 收益: 100, 总收益率: 3 },
  { label: '1.0', 放款应还本金: 170, 价格: 170, 收益: 100, 总收益率: 3 },
  { label: '未评分', 放款应还本金: 170, 价格: 170, 收益: 100, 总收益率: 3 },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['放款应还本金', '价格', '收益'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});
const scale = {
  总收益率: {
    type: 'linear',
    min: 0,
    max: 10,
  },
};

let chartIns = null;

const getG2Instance = (chart) => {
  chartIns = chart;
};
const months = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

function convert(raw) {
  const groupedData = []
  const stateClass = []
  const scatteredData = []

  Object.keys(raw).forEach(k => {
    if(k.startsWith('_')) return

    stateClass.push({
      state: k,
      'percentage of middle & upper class': raw[k].find(el => !!el['percentage of middle&upper class'])['percentage of middle&upper class']
    })

    const stateData = {}
    raw[k].forEach(mData => {
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
  return [groupedData, stateClass, scatteredData];
}

const SCOMO: React.FC<{}> = () => {

  const data = require('./mockData').mockData

  const [processedData, stateClass, scatteredData] = convert(data);
  console.log(scatteredData)
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

    </PageHeaderWrapper>
  );
};

export default SCOMO;
