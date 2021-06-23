import React from "react";
import { Checkbox } from "antd";
const Data = ({ Date, title, details, checkbox, key }) => {
  const container = {
    display: "flex",
    flexFlow: "row",
    height: "auto",
    marginTop: "20px",
  };
  const date = {
    minWidth: "80px",
    fontSize: "14px",
    textAlign: "right",
  };
  const detail = {
    borderLeft: "3px solid darkblue",
    paddingLeft: "15px",
    marginLeft: "15px",
  };
  const tit = { fontSize: "14px", color: "grey", minWidth: "270px", };
  const det = { fontSize: "12px", color: "black" };
  return (
    <div style={container} key={key}>
      {checkbox ? (
        <Checkbox style={date}>{Date}</Checkbox>
      ) : (
        <div style={date}>{Date}</div>
      )}
      <div style={detail}>
        <div style={tit}>{title}</div>
        <div style={det}>{details}</div>
      </div>
    </div>
  );
};
export default Data;
