import MainLayout from "@components/layouts/MainLayout";
import { useContext, useEffect, useState } from 'react';
import { apiList, sList } from '@api/api';
import { Card, Col, Row, Button, DatePicker } from 'antd';
import Context from '@context/Context';
import NumberFormat from 'react-number-format';
import moment from "moment"
import { GlobalOutlined, ScheduleOutlined, TableOutlined, TagsOutlined, FileOutlined, CalculatorOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
const IndexPageMoreInfo = dynamic(
  () => import('@components/IndexPageMoreInfo'),
  { ssr: false }
)
const { RangePicker } = DatePicker;
const Dashboard = () => {
  const ctx = useContext(Context);
  const [dashboardData, setDashboardData] = useState({});
  const [seeMore, setSeeMore] = useState(false);
  const [startDate, setStartDate] = useState("2019-05-01");
  const [endDate, setEndtDate] = useState();
  const dateFormat = 'YYYY-MM-DD';
  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  }
  const getData = async (start_date, end_date) => {
    ctx.setIsLoading(true);
    if (ctx.checkPermission("DASHBOARD_CARD")) {
      const data = await sList({
        code: apiList.dashboardCard, defaultParams: [{ key: "start_date", value: start_date }, { key: "end_date", value: end_date }]
      });
      setDashboardData(data?.data[0]);
    }
    ctx.setIsLoading(false);
  };
  useEffect(() => {
    const today = moment(new Date()).format('YYYY-MM-DD');
    setEndtDate(today);
    getData(startDate, today);
  }, []);
  const handleDateChange = (value, dateString) => {
    if (dateString) {
      setStartDate(dateString[0]);
      setEndtDate(dateString[1]);
      getData(dateString[0], dateString[1]);
    }
  };

  return (
    <MainLayout title="Хяналтын самбар" className="main-content-no-back">
      {ctx.state.permissions.DASHBOARD_CARD && dashboardData &&
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={24} style={{ overflow: 'hidden ', marginBottom: "20px" }}>
              <RangePicker
                style={{ float: 'right' }}
                size="large"
                placeholder={["2019-05-01", moment(new Date()).format('YYYY-MM-DD')]}
                format={dateFormat}
                onChange={handleDateChange}
                disabledDate={disabledDate}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8} style={{ overflow: 'hidden ' }}>
              <Card title="Хүсэлт гаргасан зээлийн дүн" className="custom-card-third">
                <NumberFormat value={`${dashboardData.req_amt || 0} `} displayType={'text'} thousandSeparator={true} /> ₮
                <CalculatorOutlined className="custom-card-inner-icon" />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Хүсэлт гаргасан зээлийн тоо" className="custom-card-third">
                <NumberFormat value={dashboardData.req_cnt || 0} displayType={'text'} thousandSeparator={true} />
                <FileOutlined className="custom-card-inner-icon" />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="ЖДХ" className="custom-card">
                {`${dashboardData.avg_rate || 0} %`}
                <GlobalOutlined className="custom-card-inner-icon" />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 15, marginBottom: 15 }}>
            <Col span={6}>
              <Card title="Олгосон зээлийн дүн" className="custom-card-primary">
                <NumberFormat value={`${dashboardData.issue_amt || 0} `} displayType={'text'} thousandSeparator={true} /> ₮
                <CalculatorOutlined className="custom-card-inner-icon" />
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Нийт олгосон зээл" className="custom-card-second">
                <NumberFormat value={dashboardData.issue_cnt || 0} displayType={'text'} thousandSeparator={true} />
                <TableOutlined className="custom-card-inner-icon" />
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Төлөгдөх ёстой зээл" className="custom-card-primary">
                <NumberFormat value={dashboardData.pay_cnt || 0} displayType={'text'} thousandSeparator={true} />
                <TagsOutlined className="custom-card-inner-icon" />
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Өнөөдөр төлөлт хийх" className="custom-card-second">
                <NumberFormat value={dashboardData.pay_cnt_today || 0} displayType={'text'} thousandSeparator={true} />
                <ScheduleOutlined className="custom-card-inner-icon" />
              </Card>
            </Col>
          </Row>
          {
            seeMore ? <IndexPageMoreInfo startDate={startDate} endDate={endDate} /> : (
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={() => setSeeMore(true)}
                  style={{ alignSelf: 'center' }}
                >Дэлгэрэнгүй харах</Button>
              </div>
            )
          }
        </div>
      }
    </MainLayout>
  );
};

export default Dashboard;