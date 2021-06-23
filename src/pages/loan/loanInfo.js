import React from "react";
import { Card, Row, Col } from "antd";
const LoanInfo = ({ data, col, totalVisible=true}) => {
  const total = [];
  data.map((dat, j) => {
    Object.values(dat)
      .slice(1)
      .map((e, i) => {
        {
          j === 1 ? total.push(e) : (j!==0) ? (total[i] -= e): null
        }
      });
  });
  return (
    <Card bordered={false}>
      <>
      <Row
        style={{
          justifyContent: "space-between",
          borderBottom: "0.5px dotted gray",
          marginTop: "12px",
        }}
      >
        {col.map((c, i) => {
          return (
            <Col key={i} span={4}>
              <p
                style={{
                  color:`${totalVisible?((i!==2)?"#716aca" : "#34bfa3")
                        :((i!==1)?"#34bfa3" : "#716aca")}`,
                  fontSize: "18px",
                  float: "right",
                  fontWeight: "bold",
                }}
              >
                {c}
              </p>
            </Col>
          );
        })}
      </Row>
      {/* content */}
      {data.map((dat, i) => {
        return (
          <Row
            key={i}
            style={{
              justifyContent: "space-between",
              borderBottom: `${
                i !== Object.values(dat).length - 1
                  ? "0.5px dotted gray"
                  : "none"
              }`,
              marginTop: "12px",
            }}
          >
            {Object.values(dat).map((e, i) => {
              return (
                <Col key={i} span={4}>
                  {typeof e === "object" ? (
                    <>
                      <p style={{ color: "black", height: "10px",position:"relative",top:`${totalVisible?"0":"5px"}`}}>{e?.name}</p> 
                      <span
                        style={{
                          fontSize: "12px",
                          color: "gray",
                          height: "10px",
                          position: "relative",
                          top: "-10px",
                        }}
                      >
                        {e?.desc}
                      </span>
                    </>
                  ) : (
                    <p
                      style={{
                        color:`${totalVisible?((i!==2)?"#716aca" : "#34bfa3")
                        :((i!==1)?"#34bfa3" : "#716aca")}`,
                        fontSize: "18px",
                        float: "right",
                        fontWeight: "bold",
                        position: "relative",
                        top: "5px",
                      }}
                    >{`${new Intl.NumberFormat('de-DE',{minimumFractionDigits: 2,maximumFractionDigits: 2}).format(e)} ₮`}</p>
                  )}
                </Col>
              );
            })}
          </Row>
        );
      })}
      {totalVisible? null :
      <Row
        style={{
          justifyContent: "space-between",
          marginTop: "12px",
        }}
      >
        <Col span={4}>
          <p style={{ color: "black", height: "10px",position:"relative",top:"5px"}}>Хүртэх өгөөж</p>
          {/* <span
            style={{
              fontSize: "12px",
              color: "gray",
              height: "10px",
              position: "relative",
              top: "-10px",
            }}
          >
           {totalVisible? "":""}
          </span> */}
        </Col>
        {total.map((e, i) => {
          return (
            <Col key={i} span={4}>
              <p
                style={{  
                  color:`${totalVisible?((i!==1)?"#716aca" : "#34bfa3")
                  :((i!==0)?"#34bfa3" : "#716aca")}`,
                  fontSize: "18px",
                  float: "right",
                  fontWeight: "bold",
                }}
              >
                {`${new Intl.NumberFormat('de-DE',{minimumFractionDigits: 2,maximumFractionDigits: 2}).format(e)} ₮`}
              </p>
            </Col>
          );
        })}
      </Row>
      }
      </>
    </Card>
  );
};
export default LoanInfo;
