import React, { useContext, useState,useEffect } from "react";
import MainLayout from "@components/layouts/MainLayout";
import { Button, Row, Col, Table, DatePicker } from "antd";
import { DownloadOutlined, RetweetOutlined } from "@ant-design/icons";
import CsvDownloader from "react-csv-downloader";
import moment from "moment";
import Context from "@context/Context";
import { callGet} from "@api/api";
import { columns } from "./constant";
const PayMent = () => {
  const ctx = useContext(Context);
  const dateFormat = "YYYY/MM/DD";

  const [fetchingCsv, setFetchingCsv] = useState(false);
  const [csvFetched, setCsvFetched] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const [dataSource, setdataSource] = useState([]);
  const [data, setdata] = useState([]);
  const [updatedDate, setupdatedDate] = useState('')
  const setData=(payment)=>{
    setupdatedDate(payment.date);
    setdata([]);
    Object.entries(payment.data).map((e)=>{
    e[1].name=e[0];
    data.push(e[1]);
    })
    setdataSource(data);
}
const handleDateChange = async (value, dateString) => {
  if(dateString){
    ctx.setIsLoading(true);
    var date = dateString.replaceAll("/","-");
    const payment=  await callGet(`/stat/history?type=payment&date=${date}`);
    setData(payment);
    ctx.setIsLoading(false);
}
};
const handleUpdate=async ()=>{
  ctx.setIsLoading(true);
  const payment = await callGet(`/stat/payment?isUpdate=1`);
  setData(payment);
  ctx.setIsLoading(false);
}
  useEffect(async () => {
    ctx.setIsLoading(true);
    const payment = await callGet(`/stat/payment?isUpdate=0`);
    setData(payment);
    ctx.setIsLoading(false);
  }, [])
  const exportCsv = () => {
    ctx.setIsLoading(true);
    setFetchingCsv(true);
    let cols = columns
      .slice(1)
      .map((col) => (
        {
        id: col.key,
        displayName: col.title,
      }))
      .filter((col) => col.id !== "operation");
    setCsvColumns(cols);
    console.log("csvcols",cols);
    setCsvData(dataSource);
    setCsvFetched(true);
    setFetchingCsv(false);
    ctx.setIsLoading(false);
  };
  return (
    <MainLayout title={`Эргэн төлөлт `} className="main-content">
      <Row
        gutter={20}
        style={{ padding: "15px", justifyContent: "space-between" }}
      >
        <DatePicker
          defaultValue={moment(new Date(), dateFormat)}
          format={dateFormat}
          onChange={handleDateChange}
        />
      </Row>
      <Row
        gutter={20}
        style={{ padding: "15px", justifyContent: "space-between" }}
      >
        <p>{`Сүүлд шинэчлэгдсэн огноо: ${updatedDate}`}</p>

        <Button type="info" icon={<RetweetOutlined />} onClick={handleUpdate}>
          Шинэчлэх
        </Button>

        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={exportCsv}
          loading={fetchingCsv}
        >
          Экспорт
        </Button>
        {csvFetched && (
          <CsvDownloader
            filename="Хэрэглэгч"
            columns={csvColumns}
            datas={csvData}
          >
            <Button
              style={{ border: "none", outline: "none" }}
              onClick={() => setCsvFetched(false)}
            >
              Энд дарж татаж авна уу.
            </Button>
          </CsvDownloader>
        )}
      </Row>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        bordered
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </MainLayout>
  );
};
export default PayMent;
