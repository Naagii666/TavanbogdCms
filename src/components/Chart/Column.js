import { Column } from '@ant-design/charts';
import css from "./_.module.css";

const ColumnChart = ({ title, data, xField, yField,seriesField, colors,opacity=0,additionalConfig }) => {
  if (data === undefined) {
    return <></>
  }
  const config = {
    data: data,
    xField: xField,
    yField: yField,
    seriesField:seriesField,
    theme: {
      colors10: colors
    },
    label: {
      position: 'middle',
      style: {
        opacity: opacity, 
      },
    },
    legend: {
      position: 'bottom'
    },
    ...additionalConfig
  };
  return (
    <div className={css.chartDiv}>
      <h1 className={css.chartTitle}>{title}</h1>
      <Column {...config} />
    </div>
  );
};

export default ColumnChart;