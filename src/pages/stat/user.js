import React, { useContext, useState,useEffect } from "react";
import MainLayout from "@components/layouts/MainLayout";
import { Button, Row, Table, DatePicker } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import { userColumns } from "./constant";
import CsvDownloader from "react-csv-downloader";
import Context from "@context/Context";
import { callGet } from "@api/api";
const User = () => {
  const ctx = useContext(Context);
  const dateFormat = "YYYY/MM/DD";

  const [fetchingCsv, setFetchingCsv] = useState(false);
  const [csvFetched, setCsvFetched] = useState(false);
  const [dataSource, setdataSource] = useState([])
  const [csvData, setCsvData] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const handleDateChange = async (value, dateString) => {
    if(dateString){
      ctx.setIsLoading(true);
      var date = dateString.replaceAll("/","-");

      const user=  await callGet(`/stat/history?type=user&date=${date}`);
      setdataSource(user);

      ctx.setIsLoading(false);
  }
};

  const exportCsv = async () => {
    ctx.setIsLoading(true);
    setFetchingCsv(true);
    let cols = userColumns
      .slice(1)
      .map((col) => (
        {
        id: col.key,
        displayName: col.title,
      }))
      .filter((col) => col.key !== undefined);
    setCsvColumns(cols);
    console.log("csvcols",cols);
    setCsvData(dataSource);
    setCsvFetched(true);
    setFetchingCsv(false);
    ctx.setIsLoading(false);
  };
  useEffect(async () => {
    ctx.setIsLoading(true);
    const user = await callGet(`/stat/user`);
    console.log("user",user);
    setdataSource(user);
    ctx.setIsLoading(false);
  }, []);
  return (
    <MainLayout title="Хэрэглэгч" className="main-content">
      <Row
        gutter={20}
        style={{ padding: "15px", justifyContent: "space-between" }}
      >
        <DatePicker
          defaultValue={moment(new Date(), dateFormat)}
          format={dateFormat}
          onChange={handleDateChange}
        />

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
        columns={userColumns}
        dataSource={dataSource}
        rowKey="id"
        bordered
        pagination={false}
      />
    </MainLayout>
  );
};
export default User;
