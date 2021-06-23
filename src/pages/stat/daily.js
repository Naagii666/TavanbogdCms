import React, { useContext, useState,useEffect } from "react";
import MainLayout from "@components/layouts/MainLayout";
import { Button, Row, Col, Table, DatePicker } from "antd";
import { DownloadOutlined, RetweetOutlined } from "@ant-design/icons";
import moment from "moment";
import CsvDownloader from "react-csv-downloader";
import { columns } from "./constant";
import Context from "@context/Context";
import { callGet } from "@api/api";
const DailyUpdates = () => {
  const ctx = useContext(Context);
  const dateFormat = "YYYY/MM/DD";

  const [fetchingCsv, setFetchingCsv] = useState(false);
  const [csvFetched, setCsvFetched] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const [dataSource, setdataSource] = useState([]);
  const [data, setdata] = useState([]);
  const [updatedDate, setupdatedDate] = useState('')
  const setData=(daily)=>{
    setupdatedDate(daily.date);
    setdata([]);
    Object.entries(daily.data).map((e)=>{
    e[1].name=e[0];
    data.push(e[1]);
    })
    setdataSource(data);
}
const handleDateChange = async (value, dateString) => {
  if(dateString){
    ctx.setIsLoading(true);
    var date = dateString.replaceAll("/","-");
    const daily=  await callGet(`/stat/history?type=daily&date=${date}`);
    setData(daily);
    ctx.setIsLoading(false);
}
};
const handleUpdate=async ()=>{
  ctx.setIsLoading(true);
  const daily = await callGet(`/stat/daily?isUpdate=1`);
  setData(daily);
  ctx.setIsLoading(false);
}

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
      .filter((col) => col.key !== undefined);
    setCsvColumns(cols);
    setCsvData(dataSource);
    setCsvFetched(true);
    setFetchingCsv(false);
    ctx.setIsLoading(false);
  };
  useEffect(async () => {
    ctx.setIsLoading(true);
    const daily = await callGet(`/stat/daily?isUpdate=0`);
    setData(daily);
    ctx.setIsLoading(false);
  }, []);
  return (
    <MainLayout title={`Өдрийн зээлийн мэдээ`} className="main-content">
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
          <CsvDownloader filename="Daily" columns={csvColumns} datas={csvData}>
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
export default DailyUpdates;
