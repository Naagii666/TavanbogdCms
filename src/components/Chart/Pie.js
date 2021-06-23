import { Pie } from '@ant-design/charts';
import css from "./_.module.css";

const PieChart = ({ title, data, angleField, colorField, colors,additionalConfig}) => {
  if (data === undefined) {
    return <></>
  }

  const config = {
    appendPadding: 10,
    data: data,
    color:colors,
    angleField: angleField,
    colorField: colorField,
    radius: 0.8,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}: {percentage}',
    },
    legend: {
      position: 'bottom'
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    ...additionalConfig
  }

  return (
    <div className={css.chartDiv}>
      <h1 className={css.chartTitle}>{title}</h1>
      <Pie {...config} />
    </div>
  )
}

export default PieChart;