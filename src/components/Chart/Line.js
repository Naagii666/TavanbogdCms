import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import css from "./_.module.css";
const DemoLine = ({ title, data, xField, yField, additionalConfig }) => {
  var config = {
    title: title,
    data: data,
    xField: xField,
    yField: yField,
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowColor: "yellow",
          shadowBlur: 4,
          stroke: "transparent",
          fill: "red",
        },
      },
    },
    theme: {
      geometries: {
        point: {
          diamond: {
            active: {
              style: {
                shadowColor: "#FCEBB9",
                shadowBlur: 2,
                stroke: "#F6BD16",
              },
            },
          },
        },
      },
    },
    interactions: [{ type: "marker-active" }],
    ...additionalConfig,
  };
  return (
    <div className={css.chartDiv}>
      <h1 className={css.chartTitle}>{title}</h1>
      <Line {...config} />
    </div>
  );
};

export default DemoLine;
