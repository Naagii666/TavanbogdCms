import React, { useContext, useState,useEffect } from "react";
import MainLayout from "@components/layouts/MainLayout";
import { Button, Row, Table, DatePicker } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import { mainColumns } from "./constant";
import Context from "@context/Context";
import CsvDownloader from "react-csv-downloader";
import { callGet } from "@api/api";
const Main = () => {
  const ctx = useContext(Context);
  const dateFormat = "YYYY/MM/DD";
  const [fetchingCsv, setFetchingCsv] = useState(false);
  const [csvFetched, setCsvFetched] = useState(false);
  const [csvFetched1, setCsvFetched1] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const [borrowerData, setborrowerData] = useState([]);
  const [lenderData, setlenderData] = useState([]);
  const [lenderColumns, setlenderColumns] = useState([]);
  const [borrowerColumns, setborrowerColumns] = useState([]);

  const handleDateChange = async (value, dateString) => {
      if(dateString){
        ctx.setIsLoading(true);
        var date = dateString.replaceAll("/","-");

        const borrower=  await callGet(`/stat/history?type=borrower&date=${date}`);
        console.log("dateborrower",borrower)
        setborrowerData(borrower);

        const lender=  await callGet(`/stat/history?type=lender&date=${date}`);
        console.log("datelender",lender)
        setlenderData(lender);

        ctx.setIsLoading(false);
    }
  };

  const exportCsv = (borrower) => {
    ctx.setIsLoading(true);
    setFetchingCsv(true);

    {
      borrower ? setCsvFetched(true) : setCsvFetched1(true);
    }
    //let param={borrower?"borrower":"lender"}
    let cols = mainColumns("borrower")
    .slice(1)
    .map((col) => (
      {
      id: col.key,
      displayName: col.title,
    }));
  setCsvColumns(cols);
    console.log("csvcols",cols);
    {borrower?setCsvData(borrowerData):setCsvData(lenderData)}
    setCsvFetched(true);
    setFetchingCsv(false);
    ctx.setIsLoading(false);
  };
  useEffect(async () => {
    ctx.setIsLoading(true);
    //borrower
    const borrower = await callGet(`/stat/main/borrower`);
    setborrowerData(borrower);
    setborrowerColumns(()=>mainColumns("borrower"));
    //lender
    const lender = await callGet(`/stat/main/lender`);
    setlenderData(lender);
    setlenderColumns(()=>mainColumns("lender"));
    ctx.setIsLoading(false);
  }, []);
  return (
    <MainLayout title="Ерөнхий мэдээлэл" className="main-content">
      <Row gutter={20} style={{ padding: "15px" }}>
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
        <h3>Авах хүсэлт/ Borrower's application</h3>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => {
            exportCsv(true);
          }}
          loading={fetchingCsv}
        >
          Экспорт
        </Button>
        {csvFetched && (
          <CsvDownloader
            filename="Авах хүсэлт"
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
        key="1"
        columns={borrowerColumns}
        dataSource={borrowerData}
        rowKey="id"
        bordered
        pagination={false}
      />
      <Row
        gutter={20}
        style={{ padding: "15px", justifyContent: "space-between" }}
      >
        <h3>Өгөх хүсэлт / Lender's application</h3>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => {
            exportCsv(false);
          }}
          loading={fetchingCsv}
        >
          Экспорт
        </Button>
        {csvFetched1 && (
          <CsvDownloader
            filename="Өгөх хүсэлт"
            columns={csvColumns}
            datas={csvData}
          >
            <Button
              style={{ border: "none", outline: "none" }}
              onClick={() => setCsvFetched1(false)}
            >
              Энд дарж татаж авна уу.
            </Button>
          </CsvDownloader>
        )}
      </Row>
      <Table
        columns={lenderColumns}
        dataSource={lenderData}
        rowKey="id"
        bordered
        pagination={false}
      />
    </MainLayout>
  );
};
export default Main;
