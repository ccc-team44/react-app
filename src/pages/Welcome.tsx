import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Alert, Card, Typography} from 'antd';
import {Axis, Chart, Geom, Legend, Tooltip} from "bizcharts";
import DataSet from "@antv/data-set";
import axios from 'axios'
import styles from './Welcome.less';
import ErrorBoundary from "@/components/ErrorBoundary";

const CodePreview: React.FC<{}> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);


// todo refactor later
const SnippetChart = ({data}: any) => {
  const { DataView } = DataSet;

  const ages = [
    "Under 5 Years",
    "5 to 13 Years",
    "14 to 17 Years",
    "18 to 24 Years",
    "25 to 44 Years",
    "45 to 64 Years",
    "65 Years and Over"
  ];
  const dv = new DataView();
  dv.source(data)
    .transform({
      type: "fold",
      fields: ages,
      key: "age",
      value: "population",
      retains: ["State"]
    })
    .transform({
      type: "map",
      callback:( obj: any) => {
        const key = obj.age;
        let type;

        if (
          key === "Under 5 Years" ||
          key === "5 to 13 Years" ||
          key === "14 to 17 Years"
        ) {
          type = "a";
        } else if (key === "18 to 24 Years") {
          type = "b";
        } else if (key === "25 to 44 Years") {
          type = "c";
        } else {
          type = "d";
        }

        obj.type = type;
        return obj;
      }
    });
  const colorMap = {
    "Under 5 Years": "#E3F4BF",
    "5 to 13 Years": "#BEF7C8",
    "14 to 17 Years": "#86E6C8",
    "18 to 24 Years": "#36CFC9",
    "25 to 44 Years": "#209BDD",
    "45 to 64 Years": "#1581E6",
    "65 Years and Over": "#0860BF"
  };
  const cols = {
    population: {
      tickInterval: 1000000
    }
  };

  return <Chart
    data={dv}
    scale={cols}
    padding={[20, 160, 80, 60]}
    forceFit
  >
    <Axis
      name="population"
      label={{
        formatter(val) {
          return `${val / 1000000  }M`;
        }
      }}
    />
    <Legend position="right" />
    <Tooltip />
    <Geom
      type="interval"
      position="State*population"
      color={[
        "age",
        function(age) {
          return colorMap[age];
        }
      ]}
      tooltip={[
        "age*population",
        (age, population) => {
          return {
            name: age,
            value: population
          };
        }
      ]}
      adjust={[
        {
          type: "dodge",
          dodgeBy: "type",
          marginRatio: 0
        },
        {
          type: "stack"
        }
      ]}
    />
  </Chart>
}

// eslint-disable-next-line no-undef
const serverAddress = process.env.NODE_ENV === 'production' ? `http://${window.location.host}:8002` : 'http://localhost:8002';

export default (): React.ReactNode => {
  const [data, setData] = React.useState<any>(null);
  React.useEffect(() => {
    axios.get(`${serverAddress}/tweets`).then( res => {
      if(res.status === 200 && typeof res?.data?.data === "object")
        setData(res.data.data)
    }).catch(console.log)
  },[])
  return (
    <ErrorBoundary>
      <PageHeaderWrapper>
        <Card>
          <Alert
            message="Team 44"
            type="success"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />
        </Card>
      </PageHeaderWrapper>
    </ErrorBoundary>
  );
}
