import dynamic from "next/dynamic";
import MainLayout from "@components/layouts/MainLayout";
import { useContext, useEffect, useState } from "react";
import { apiList, sList } from "@api/api";
import { Col, Row } from "antd";
import Context from "@context/Context";
const PieChart = dynamic(() => import("@components/Chart/Pie"), { ssr: false });
const ColumnChart = dynamic(() => import("@components/Chart/Column"), {
  ssr: false,
});

const Statistic = () => {
  const ctx = useContext(Context);
  const [addressData, setAddressData] = useState({});
  const [ageData, setAgeData] = useState({});
  const [usersByYearData, setUsersByYearData] = useState({});
  const [usersBySeasonData, setUsersBySeasonData] = useState({});
  const [usersByMonthData, setUsersByMonthData] = useState({});
  const [usersByWeekData, setUsersByWeekData] = useState({});
  const [balanceData, setBalanceData] = useState({});
  const [brokerData, setBrokerData] = useState({});

  useEffect(() => {
    const getData = async () => {
      ctx.setIsLoading(true);
      const addressResult = await sList({ code: apiList.statAddress });
      setAddressData(addressResult?.data);

      const ageResult = await sList({ code: apiList.statAge });
      setAgeData(ageResult?.data);
      ctx.setIsLoading(false);

      const usersByYearResult = await sList({ code: apiList.statUsersByYear });
      setUsersByYearData(usersByYearResult?.data);

      const usersBySeasonResult = await sList({
        code: apiList.statUsersBySeason,
      });
      setUsersBySeasonData(usersBySeasonResult?.data);

      const usersByMonthResult = await sList({
        code: apiList.statUsersByMonth,
      });
      setUsersByMonthData(usersByMonthResult?.data);

      const usersByWeekResult = await sList({ code: apiList.statUsersByWeek });
      setUsersByWeekData(usersByWeekResult?.data);

      const balanceResult = await sList({ code: apiList.statBalance });
      setBalanceData(balanceResult?.data);

      const brokerResult = await sList({ code: apiList.statBroker });
      setBrokerData(brokerResult?.data);
    };

    getData();
  }, []);

  const style = {
    background: "#fff",
    padding: "10px",
    border: "1px solid #ddd",
  };

  return (
    <MainLayout title="Статистик" className="main-content-no-back">
      <Row gutter={20}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            {addressData.length > 0 && (
              <PieChart
                title="Хаягийн байршил"
                data={addressData}
                angleField="cnt"
                colorField="name"
              />
            )}
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            {addressData.length > 0 && (
              <ColumnChart
                title="Хаягийн байршил"
                data={addressData}
                xField="name"
                yField="cnt"
              />
            )}
          </div>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            {ageData.length > 0 && (
              <ColumnChart
                title="Нас, хүйс"
                data={ageData}
                xField="age_category"
                yField="cnt"
                additionalConfig={{ isGroup: true, seriesField: "gender" }}
              />
            )}
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            {usersByYearData.length > 0 && (
              <PieChart
                title="Шинээр бүртгүүлсэн хэрэглэгчийн тоо /Жилээр/"
                data={usersByYearData}
                angleField="cnt"
                colorField="name"
              />
            )}
          </div>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            {usersBySeasonData.length > 0 && (
              <ColumnChart
                title="Шинээр бүртгүүлсэн хэрэглэгчийн тоо /Улирлаар/"
                data={usersBySeasonData}
                xField="season"
                yField="cnt"
                additionalConfig={{ isGroup: true, seriesField: "year" }}
              />
            )}
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            {usersByMonthData.length > 0 && (
              <ColumnChart
                title="Шинээр бүртгүүлсэн хэрэглэгчийн тоо /Сараар/"
                data={usersByMonthData}
                xField="name"
                yField="cnt"
              />
            )}
          </div>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col className="gutter-row" span={24}>
          <div style={style}>
            {usersByWeekData.length > 0 && (
              <ColumnChart
                title="Шинээр бүртгүүлсэн хэрэглэгчийн тоо /7 хоногоор/"
                data={usersByWeekData}
                xField="name"
                yField="cnt"
              />
            )}
          </div>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            {balanceData.length > 0 && (
              <PieChart
                title="Хувьцааны үлдэгдлээр"
                data={balanceData}
                angleField="cnt"
                colorField="name"
              />
            )}
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            {balanceData.length > 0 && (
              <ColumnChart
                title="Хувьцааны үлдэгдлээр"
                data={balanceData}
                xField="name"
                yField="cnt"
              />
            )}
          </div>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            {brokerData.length > 0 && (
              <PieChart
                title="Брокерийн компаниар"
                data={brokerData}
                angleField="cnt"
                colorField="name"
              />
            )}
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            {brokerData.length > 0 && (
              <ColumnChart
                title="Брокерийн компаниар"
                data={brokerData}
                xField="name"
                yField="cnt"
              />
            )}
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Statistic;
