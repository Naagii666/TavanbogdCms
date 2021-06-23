import { Tag, Col, Row } from "antd";

// User table columns
const userColumns = [
  {
    title:"-",
    align: "right",
    key:"",
    dataIndex:"",
    render: (text,record,index) => (
      <div>{index?"Active":"Total"}</div>
    ),
    width:"14%"
  },
  {
    title: "Subscriber",
    dataIndex: "subCnt",
    key: "subCnt",
    align: "right",
    width:"14%"
  },
  {
    title: "Тэнгэр /50/",
    dataiIndex: "skyCnt",
    key: "skyCnt",
    align: "right",
    width:"14%"
  },
  {
    title: "Газар /50>/",
    dataIndex: "landCnt",
    key: "landCnt",
    align: "right",
    width:"14%"
  },
  {
    title: "Чулуу",
    dataIndex: "stoneCnt",
    key: "stoneCnt",
    align: "right",
    width:"14%"
  },
  {
    title: "Total Peter person amount",
    dataIndex: "peterPersonCnt",
    key: "peterPersonCnt",
    align: "right",
    width:"14%"
  },
  {
    title:"Total Pacman person amount",
    align: "right",
    width:"15%",
    key:"personamount",dataIndex:"personamount",
    render: (text,record) => (
      <>
        <div key="pacmanPersonCnt1" dataindex="pacmanPersonCnt1">{record.pacmanPersonCnt1} </div>
        <hr /> 
        <div key="pacmanPersonCnt2" dataindex="pacmanPersonCnt2">{record.pacmanPersonCnt2}</div>
      </>
    ),
  }
];

// Main table columns
const mainColumns=(val)=>{
  return(
  [
    {
      title:"-",
      align: "right",
      key:"",
      dataIndex:"",
      render: (text,record,index) => (
        <div>{index?"Active":"Total"}</div>
      ),
    },
    {
      title:`${val==="borrower"?"Peter":"Pan"} person request`,
      dataIndex: "ppReqCnt",
      key: "ppReqCnt",
      align: "right",
    },
    {
      title: `${val==="borrower"?"Peter":"Pan"} request portfolio`,
      dataIndex: "pReqPortfolio",
      key: "pReqPortfolio",
      align: "right",
    },
    {
      title: `${val==="borrower"?"Peter":"Pan"} request amount`,
      dataIndex: "pReqAmt",
      key: "pReqAmt",
      align: "right",
    },
    {
      title: `${val==="borrower"?"Peter":"Pan"}  person amount`,
      dataIndex: "ppAmt",
      key: "ppAmt",
      align: "right", 
    },
    {
      title: `${val==="borrower"?"Peter":"Pan"}  loan portfolio`,
      dataIndex: "pLoanPortfolio",
      key: "pLoanPortfolio",
      align: "right",
    },
    {
      title: `${val==="borrower"?"Peter":"Pan"} loan amount`,
      align: 'right',
      dataIndex:"pLoanAmt",
      key: 'pLoanAmt',
    },
])
}
// Daily table columns
const columns=
  [
    {
      title:"-",
      dataIndex: "name",
      key: "name",
      align: "right",
    },
    {
      title:"Peter person amount",
      dataIndex: "ppAmt",
      key: "ppAmt",
      align: "right",
    },
    {
      title: "Peter loan portfolio",
      dataIndex: "plPortfolio",
      key: "plPortfolio",
      align: "right",
    },
    {
      title: "Peter loan amount",
      dataIndex: "plAmt",
      key: "plAmt",
      align: "right",
    },    
  ]


const css = {
  backgroundColor: "#fff",
  width: "95px",
  height: "30px",
  padding:"4px"
};
const cols1 = [
  {
    title: "-",
    dataIndex: "name",
    key: "name",
    align: "right",
  },
  {
    title: "Peter person amount",
    align: "right",
    dataIndex: "personamount",
    key:"personamount",
    render: (text,record) => (
      <Row>
        <Col span={12} >
          <Tag
            
            style={{
              border: "1px solid black",
              ...css,
              position: "relative",
              top: "30%",
            }}
            dataindex= "ppAmt"
            key="ppAmt"
          >
            {record.ppAmt}
          </Tag>
        </Col>
        <Col span={12}>
          <Tag
            style={{
              border: "1px solid green",
              ...css,
              marginBottom:"10px"
            }}
            dataindex= "ppAmt1"
            key="ppAmt1"
          >
            {record.ppAmt1}
          </Tag>
          <Tag
            style={{
              border: "1px solid red",
              ...css,
            }}
            dataindex= "ppAmt2"
            key="ppAmt2"
          >
            {record.ppAmt2}
          </Tag>
        </Col>
      </Row>
    ),
  },
  {
    title: "Peter loan portfolio",
    align: "right",
    dataIndex: "loanportfolio",
    key:"loanportfolio",
    render: (text,record) => (
      <Row>
        <Col span={12}>
          <Tag
            style={{
              border: "1px solid black",
              ...css,
              position: "relative",
              top: "30%",
            }}
            dataindex= "plPortfolio"
            key="plPortfolio"
          >
            {record.plPortfolio}
          </Tag>
        </Col>
        <Col span={12}>
          <Tag
            style={{
              border: "1px solid green",
              ...css,
              marginBottom:"10px"
            }}
            dataindex= "plPortfolio1"
            key="plPortfolio1"
          >
            {record.plPortfolio1}
          </Tag>
          <Tag
            style={{
              border: "1px solid red",
              ...css,
            }}
            dataindex= "plPortfolio2"
            key="plPortfolio2"
          >
            {record.plPortfolio2}
          </Tag>
        </Col>
      </Row>
    ),
  },
  {
    title: "Peter loan amount",
    dataIndex: "loanAmount",
    key: "loanAmount",
    align: "right",
    render: (text,record) => (
      <Row>
        <Col span={12}>
          <Tag
            style={{
              border: "1px solid black",
              ...css,
              position: "relative",
              top: "30%",
            }}
            dataindex= "plAmt"
            key="plAmt"
          >
            {record.plAmt}
          </Tag>
        </Col>
        <Col span={12}>
          <Tag
            style={{
              border: "1px solid green",
              ...css,
              marginBottom:"10px"
            }}
            dataindex= "plAmt1"
            key="plAmt1"
          >
            {record.plAmt1}
          </Tag>
          <Tag
            style={{
              border: "1px solid red",
              ...css,
            }}
            dataindex= "plAmt2"
            key="plAmt2"
          >
            {record.plAmt2}
          </Tag>
        </Col>
      </Row>
    ),
  },
];
export { userColumns, cols1, mainColumns,columns };
