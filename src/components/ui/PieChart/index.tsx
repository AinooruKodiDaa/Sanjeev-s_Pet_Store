import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface DataItem {
  name: string;
  value: number;
}

interface PieChartProps {
  data: DataItem[];
  colors: { [key: string]: string };
}

const PieChart: React.FC<PieChartProps> = ({ data, colors }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const options: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Pie Chart',
          type: 'pie',
          radius: '50%', // Adjust radius as needed
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data.map((item: DataItem) => ({
            name: item.name,
            value: item.value,
            itemStyle: {
              color: colors[item.name] || '#2196f3' // Default color if specific color not provided
            }
          }))
        }
      ]
    };

    chart.setOption(options);

    return () => {
      chart.dispose(); // Dispose chart instance on unmounting
    };
  }, [data, colors]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default PieChart;
