import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';

interface Item {
  key: string;
  value: number;
}
interface OtherItem {
  otherType: string;
  value: number;
}

const LangCountPieChart = ({ data, others,sum }: {
  data: Item[],
  others: OtherItem[],
  sum: number
}) => {
  const otherRatio = data[data.length - 1].value / sum; // Other 的占比

  const otherOffsetAngle = otherRatio * Math.PI; // other 占的角度的一半

  const chartWidth = 500;
  const chartHeight = 600;

  G2.Shape.registerShape('interval', 'otherShape', {
    draw(cfg: { points: any; color: any; }, container: { addShape: (arg0: string, arg1: { attrs: { path: any[][]; stroke: any; lineWidth: number; } | { fill: any; path: any; }; }) => void; }) {
      const points = cfg.points;
      let path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push(['L', points[1].x, points[1].y]);
      path.push(['L', points[2].x, points[2].y]);
      path.push(['L', points[3].x, points[3].y]);
      path.push('Z');
      path = G2.Shape.parsePath(path);

      const parsePoints = G2.Shape.parsePoints(points);
      const linePath = [
        ['M', parsePoints[3].x, parsePoints[3].y],
        ['L', chartWidth * 0.7, 20],
        ['M', parsePoints[2].x, parsePoints[2].y],
        ['L', chartWidth * 0.7, chartHeight - 70],
      ];
      container.addShape('path', {
        attrs: {
          path: linePath,
          stroke: cfg.color,
          lineWidth: 1,
        },
      });
      return container.addShape('path', {
        attrs: {
          fill: cfg.color,
          path,
        },
      });
    },
  });
  const scale2 = {
    value: {
      nice: false,
    },
  };

  return (
    <Chart height={chartHeight} weight={chartWidth} forceFit padding={[20, 0, 'auto', 0]}>
      <Legend />
      <View
        data={data}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 0.5,
          y: 1,
        }}
      >
        <Coord
          type="theta"
          startAngle={0 + otherOffsetAngle}
          endAngle={Math.PI * 2 + otherOffsetAngle}
        />
        <Geom
          type="intervalStack"
          position="value"
          color="key"
          shape={[
            'key',
              (key: string) => {
              if (key === 'Other') {
                return 'otherShape';
              }

              return 'rect';
            },
          ]}
        >
          <Label
            content="key"
            offset={-20}
            textStyle={{
              rotate: 0,
            }}
          />
          <Label
            content="key"
            custom={true}
            htmlTemplate={(text, item) => {
              return `<div style="text-align:center;"><span>${text}:${(item.point.value / sum * 100
              ).toFixed(0)}%</span></div>`;
            }}
          />
        </Geom>
      </View>
      <View
        data={others}
        scale={scale2}
        start={{
          x: 0.6,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
      >
        <Geom type="intervalStack" position="1*value" color={['key', '#FCD7DE-#F04864']}>
          <Label
            offset={}{-20}
            content="key"
            custom={true}
            htmlTemplate={(text, item) => {
              return `<div style="text-align:center;"><span>${text}:${(item.point.value / sum * 100
              ).toFixed(0)}%</span></div>`;
            }}
          />
        </Geom>
      </View>
    </Chart>
  );
};

export default LangCountPieChart;
