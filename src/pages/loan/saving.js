import React, { useContext, useState,useEffect } from "react";
import { Card, Col, Row } from "antd";
import MainLayout from "@components/layouts/MainLayout";
import CardComponent from "../../components/Card";
import Datatable from "@components/Datatable";
import { callGet ,apiList} from "@api/api";
import LoanInfo from "./loanInfo";
import Context from "@context/Context";
const Loan = () => {
  const ctx = useContext(Context);
  const [responseData, setResponseData] = useState({})
  const [savingInfo, setSavingInfo] = useState([]);
  const [savingUserInfo, setSavingUserInfo] = useState([]);
  const [savingInfoData, setSavingInfoData] = useState([]);
  const savingColumn = ["", "Төлөвлөгдсөн", "Төлсөн", "Бодит", "Үлдэгдэл"];
  useEffect(async() => {
    ctx.setIsLoading(true);
    const response = await callGet(`${apiList.loanSavingInfo}?id=7711427429205970`)
    setResponseData(response);
    ctx.setIsLoading(false);
  }, [])
  useEffect(() => {
    setSavingUserInfo([
      {name:"Овог",val:responseData.lastName},
      {name:"Нэр",val:responseData.firstName},
      {name:"Утас",val:responseData.username},
      {name:"Хөрөнгө оруулалтын давтамж",val:responseData.cnt}])
      setSavingInfo([
        {name:"Хөрөнгө оруулалтын хэмжээ",val:`${new Intl.NumberFormat('de-DE',{minimumFractionDigits: 2,maximumFractionDigits: 2}).format(responseData.loanAmt)} ₮`},
        {name:"Гэрээний хугацаа",val:`${responseData.loanTerm} сар`},
        {name:"Өгөөжийн хувь",val:`${responseData.rateYear} %`},
        {name:"Шимтгэлийн дүн",val:`${new Intl.NumberFormat('de-DE',{minimumFractionDigits: 2,maximumFractionDigits: 2}).format(responseData.issueFeeAmt)} ₮`},
        {name:"Гэрээ байгуулсан огноо",val:responseData.contractStartDate},
        {name:"Гэрээ дуусах огноо",val:responseData.contractEndDate},
        {name:"Өгөөж хүртэх хугацаа",val:responseData.rateProfit},
        {name:"Төлөв",val:responseData.status}])
        setSavingInfoData([
            {
              col1: {
                name: "Хөрөнгө оруулалтын хэмжээ",
                desc: "",
              },
              col2:responseData.loanAmt,
              col3:responseData.loanAmtPaid,
              col4: responseData.loanAmtNow,
              col5: responseData.loanAmt-responseData.loanAmtPaid,
            },
            {
              col1: {
                name: "Өгөөжийн хэмжээ",
                desc: "",
              },
              col2: responseData.profit,
              col3: responseData.profitPaid,
              col4: responseData.profitNow,
              col5: responseData.profit-responseData.profitNow,
            },
            {
              col1: {
                name: "Шимтгэл /0,5%/",
                desc: "",
              },
              col2: responseData.issueFeeAmt,
              col3: responseData.issueFeeAmtPaid,
              col4: responseData.issueFeeAmt,
              col5: responseData.issueFeeAmt-responseData.issueFeeAmtPaid,
            },
            {
              col1: {
                name: "ХАОАТ суутгал /10%/",
                desc: "",
              },
              col2: responseData.taxAmt,
              col3: responseData.taxAmtPaid,
              col4: responseData.taxAmtNow,
              col5: responseData.taxAmt-responseData.taxAmtPaid,
            },
        ])
  }, [responseData])
  return (
    <MainLayout title="Хөрөнгө оруулалтын мэдээлэл" className="main-content-no-back">
      {ctx.checkPermission("LOAN_SHOW") && (
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={12}>
              <CardComponent
                title="Хөрөнгө оруулалтын мэдээлэл"
                data={savingInfo}
                height={true}
              />
            </Col>
            <Col span={12}>
              <CardComponent
                title="Хөрөнгө оруулагч"
                data={savingUserInfo}
                height={true}
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={24}>
                <LoanInfo data={savingInfoData} col={savingColumn} totalVisible={false}/>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={12}>
              <Card
                title={
                  <span style={{ color: "grey", fontSize: "18px" }}>
                    Төлөвлөгдсөн төлбөрийн хуваарь
                  </span>
                }
              >
                <Datatable title={"news"} code={"news"} showTitle={false} />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <span style={{ color: "grey", fontSize: "18px" }}>
                    Бодит төлбөрийн хуваарь
                  </span>
                }
                bordered={true}
              >
                <Datatable title={"news"} code={"news"} showTitle={false} />
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </MainLayout>
  );
};
export default Loan;
