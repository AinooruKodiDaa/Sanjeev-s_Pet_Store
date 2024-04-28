import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Typography } from '../Typography';

interface DataItem {
  name: string;
  value: number;
}

interface BarChartProps {
  data: DataItem[];
  colors: { [key: string]: string };
}

const BarChart: React.FC<BarChartProps> = ({ data, colors }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const options: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        data: data.map((item: DataItem) => item.name)
      },
      yAxis: {
        type: 'value',
       
    },
      series: [{
        data: data.map((item: DataItem) => ({
          value: item.value,
          itemStyle: {
            color: colors[item.name] || '#2196f3' // Default color if specific color not provided
          }
        })),
        type: 'bar'
      }]
    };

    chart.setOption(options);

    return () => {
      chart.dispose(); // Dispose chart instance on unmounting
    };
  }, [data, colors]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default BarChart;
