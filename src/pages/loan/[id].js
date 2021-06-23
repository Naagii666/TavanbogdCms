import React, { useContext, useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import MainLayout from "@components/layouts/MainLayout";
import { apiList, callGet, sList } from "@api/api";
import CardComponent from "../../components/Card";
import Datatable from "@components/Datatable";
import LoanInfo from "./loanInfo";
import Context from "@context/Context";
const Loan = () => {
  const [responseData, setResponseData] = useState({});
  const [lender, setLender] = useState({});
  const [borrower, setBorrower] = useState({});
  const [borrowerData, setBorrowerData] = useState([]);
  const [lenderData, setLenderData] = useState([]);
  const [loanInfo, setLoanInfo] = useState([]);
  const [loanInfoData, setLoanInfoData] = useState();
  const loanColumns = ["", "Төлөвлөгдсөн", "Төлсөн", "Бодит", "Хаах"];
  const ctx = useContext(Context);
  useEffect(async () => {
    ctx.setIsLoading(true);
    const res = await callGet(
      `${apiList.loanSingle}?loanIssuedId=7062858989864213`
    );
    setResponseData(res);
    const lender = await sList({
      code: apiList.loanUserInfo,
      customFilter: [{ key: "user_id", val: res.lrUserId }],
    });
    setLender(lender?.data[0]);
    const borrower = await sList({
      code: apiList.loanUserInfo,
      customFilter: [{ key: "user_id", val: res.loUserId }],
    });
    setBorrower(borrower?.data[0]);
    ctx.setIsLoading(false);
  }, []);
  useEffect(() => {
    //borrower
    ctx.setIsLoading(true);
    setBorrowerData([
      { name: "Овог", val: borrower.last_name },
      { name: "Нэр", val: borrower.first_name },
      { name: "Регистрийн дугаар", val: borrower.register_number },
      { name: "Дугаар", val: borrower.username },
    ]);

    //Lender
    setLenderData([
      { name: "Овог", val: lender.last_name },
      { name: "Нэр", val: lender.first_name },
      { name: "Регистрийн дугаар", val: lender.register_number },
      { name: "Дугаар", val: lender.username },
    ]);

    //loanInfo
    setLoanInfo([
      {
        name: "Зээлийн хэмжээ",
        val: `${new Intl.NumberFormat("de-DE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(responseData.loanAmt)} ₮`,
      },
      { name: "Зээлийн хугацаа", val: responseData.loanTermAmt },
      {
        name: "Зээлийн хүү",
        val: `${responseData.rateTermAmt} сарын ${responseData.rateAmt} %`,
      },
      { name: "Зээл олгосон огноо", val: responseData.issuedDate },
      { name: "Олгосон зээл", val: "Дансаар" },
      { name: "Зээлийн төлөв", val: responseData.reqStatus },
    ]);

    //loanInfoData
    setLoanInfoData([
      {
        col1: {
          name: "Үндсэн зээл",
          desc: "Олгосон зээлийн хэмжээ",
        },
        col2: responseData.toPayPrincipal,
        col3: responseData.paidPrincipal,
        col4: responseData.toSchedPrincipal,
        col5: responseData.toClosePrincipal,
      },
      {
        col1: {
          name: "Хүү",
          desc: "Хүүгийн хэмжээ",
        },
        col2: responseData.toPayInterest,
        col3: responseData.paidInterest,
        col4: responseData.toSchedInterest,
        col5: responseData.toCloseInterest,
      },
      {
        col1: {
          name: "Шимтгэл",
          desc: "Шимтгэл",
        },
        col2: responseData.toPayIssueFee,
        col3: responseData.paidIssueFee,
        col4: responseData.toSchedIssueFee,
        col5: responseData.toCloseIssueFee,
      },
      {
        col1: {
          name: "Алданги",
          desc: "Зээлдэгчийн алдангийн хэмжээ",
        },
        col2: responseData.toPayPenalty,
        col3: responseData.paidPenalty,
        col4: responseData.toSchedPenalty,
        col5: responseData.toClosePenalty,
      },
      {
        col1: {
          name: "Нийт",
          desc: "Нийт",
        },
        col2: responseData.toPayTotal,
        col3: responseData.paidTotal,
        col4: responseData.toSchedTotal,
        col5: responseData.toCloseTotal,
      },
    ]);
    ctx.setIsLoading(false);
  }, [borrower, lender]);
  return (
    <MainLayout title="Зээлийн дэлгэрэнгүй" className="main-content-no-back">
      {ctx.checkPermission("LOAN_SHOW") && (
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <CardComponent title="Зээлийн мэдээлэл" data={loanInfo} />
            </Col>
            <Col span={8}>
              <CardComponent title="Зээлдэгч" data={lenderData} />
            </Col>
            <Col span={8}>
              <CardComponent title="Зээлүүлэгч" data={borrowerData} />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={24}>
            {loanInfoData?
              <LoanInfo data={loanInfoData} col={loanColumns} />
            :null}
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={24}>
              <Card
                title={
                  <span style={{ color: "grey", fontSize: "18px" }}>
                    Зээлийн анх үүссэн төлбөрийн хуваарь
                  </span>
                }
              >
                <Datatable title={"news"} code={"news"} showTitle={false} />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={24}>
              <Card
                title={
                  <span style={{ color: "grey", fontSize: "18px" }}>
                    Зээлийн эргэн төлөлтийн хуваарь
                  </span>
                }
                bordered={true}
              >
                <Datatable title={"news"} code={"news"} showTitle={false} />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "20px" }}>
            <Col span={24}>
              <Card
                title={
                  <span style={{ color: "grey", fontSize: "18px" }}>
                    Зээлийн эргэн төлөлт
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
