import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import css from "./_.module.css";
const DemoBar = ({
  title,
  data,
  xField,
  yField,
  additionalConfig,
  onReady,
}) => {
  var config = {
    data: data,
    xField: xField,
    yField: yField,
    seriesField: xField,
    barWidthRatio: 0.9, 
    legend: { position: "top-left" },
    onReady: onReady,
    ...additionalConfig,
  };
  return (
    <div className={css.chartDiv}>
      <h1 className={css.chartTitle}>{title}</h1>
      <Bar {...config} />
    </div>
  );
};

export default DemoBar;
