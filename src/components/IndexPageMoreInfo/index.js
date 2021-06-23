import { Row, Col, Grid ,Card} from "antd";
import Context from '@context/Context';
import PieChart from "@components/Chart/Pie";
import BarChart from "@components/Chart/Bar";
import ColumnChart from "@components/Chart/Column";
import { useState,useContext,useEffect } from "react";
import { apiList, sList } from '@api/api';
const data1 = [
  {name: "Нээлттэй ",cnt: 3877,},
  {name: "Шинэ ",cnt: 73744,},
  {name: "Шалгагдаж байгаа ",cnt: 24931,},
  {name: "Идэвхтэй ",cnt: 31700,},
  {name: "Идэвхгүй ",cnt: 35883,},
];
const data2=[
  { "city": "石家庄", "type": "水果", "value": 14500,},
  { "city": "石家庄", "type": "米面", "value": 8500, },
  { "city": "深圳", "type": "水果", "value": 9000, },
  { "city": "深圳", "type": "米面", "value": 8500, },
  { "city": "温州", "type": "水果", "value": 16000, },
  { "city": "温州", "type": "茶叶", "value": 10000, },
  { "city": "宁波", "type": "水果", "value": 14000, },
  { "city": "宁波", "type": "米面", "value": 9000,},
  { "city": "宁波", "type": "特产零食", "value": 10000, },
  { "city": "宁波", "type": "茶叶", "value": 9000,},
  { "city": "无锡", "type": "特产零食", "value": 10000 },
  { "city": "无锡", "type": "茶叶", "value": 6000 },
  { "city": "杭州", "type": "特产零食", "value": 10000 },
  { "city": "杭州", "type": "茶叶", "value": 6000 },
  { "city": "北京", "type": "特产零食", "value": 7000 },
  { "city": "北京", "type": "茶叶", "value": 10000 },
]
const IndexPageMoreInfo = (date) => {
  const ctx = useContext(Context);
  const screens = Grid.useBreakpoint();
  const [selectedAimag, setSelectedAimag] = useState(1);
  const [isRender, setIsRender] = useState(false)
  const [chartUser, setChartUser] = useState([]);
  const [chartAge, setChartAge] = useState([]);
  const [chartGender, setChartGender] = useState([]);
  const [chartBank, setChartBank] = useState([]);
  const [chartActiveLoan, setChartActiveLoan] = useState([]);
  const [chartAimag, setChartAimag] = useState([]);
  const [chartSoum, setChartSoum] = useState([]);
  const [chartLoanIssued, setChartLoanIssued] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [activeLoanTotal, setActiveLoanTotal] = useState(0);
  const onReady = (plot) => {
    plot.on("element:click", (selected) => {
       setSelectedAimag(selected.data.data.id);
    });
  };
  const getData = async (code,permission,set,aimag_id) => {
    if (ctx.checkPermission(permission)) {
      const data = await sList({
        code: code, 
        defaultParams: [
          { key: "start_date", value: date.startDate }, 
          { key: "end_date", value: date.endDate },
          { key: "aimag_id", value: aimag_id },
        ],
      });
      if(code==="chartActiveLoan"){
        set([{name:'Төлсөн',cnt:data?.data[0].paid},{name:'Хоцорсон',cnt:data?.data[0].late},{name:'Нэг ч төлөөгүй', cnt:data?.data[0].pay}])
        setActiveLoanTotal(data?.data[0].total);
      }else if(code==="chartLoanIssued"){
          const loanIssued=[];
          data?.data.map((e)=>{
            loanIssued.push({type:"Зээлийн тоо",value:e.cnt,date:e.name});
            loanIssued.push({type:"Зээлийн дүн", value:e.amt,date:e.name});
          })
          set(loanIssued);
      }else{
        set(data?.data);
      }
      if(code==="chartUser"){
        var total=0;
        data?.data.map((e)=>{
          total+=e.cnt;
          setTotalUser(total);
        })
      }
    }
  };
  useEffect(() => {
    getData(apiList.chartUser,"CHART_USER",setChartUser);
    getData(apiList.chartAge,"CHART_AGE",setChartAge);
    getData(apiList.chartGender,"CHART_GENDER",setChartGender);
    getData(apiList.chartBank,"CHART_BANK",setChartBank);
    getData(apiList.chartActiveLoan,"CHART_ACTIVE_LOAN",setChartActiveLoan);
    getData(apiList.chartAimag,"CHART_AIMAG",setChartAimag);
    getData(apiList.chartSoum,"CHART_SOUM",setChartSoum,selectedAimag);
    getData(apiList.chartLoanIssued,"CHART_LOAN_ISSUED",setChartLoanIssued);
  }, [date.startDate,date.endDate])
  useEffect(() => {
    if(isRender) {
      getData(apiList.chartSoum,"CHART_SOUM",setChartSoum,selectedAimag);
    } else {
      setIsRender(true);
    }
  }, [selectedAimag]);
  return (
    <>
      <Row gutter={16}>
        <Col span={screens.xl ? 12 : 24} style={{marginBottom:"20px"}}>
          <Card title={<span style={{ color: "black", fontSize: "20px" }}>Харилцагч (Нийт: {totalUser})</span>} >
          <PieChart
            data={chartUser}
            angleField="cnt"
            colorField="name" 
            colors={['#15d8ff','#15b4ca','#1aa2b1','#1e9099','#217e83','#215c5a']}
          />
          </Card>
        </Col>
        <Col span={screens.xl ? 12 : 24} style={{marginBottom:"20px"}}>
        <Card title={<span style={{ color: "black", fontSize: "20px" }}>Насны ангиллаар</span>} >
          <PieChart 
            data={chartAge}
            angleField="cnt"
            colorField="name"
            colors={['#c80909','#d63d00','#e25d00','#ec7b00','#f49700','#fab200','#fdce00','#ffe925','#40c322','#00b285','#2030d3']}
          />
          </Card>
        </Col>
      </Row>
      <Row  gutter={16}>
        <Col span={screens.xl ? 12 : 24} style={{marginBottom:"20px"}}>
          <Card title={<span style={{ color: "black", fontSize: "20px" }}>Нийт олгосон идэвхтэй зээл (Нийт: {activeLoanTotal})</span>} >
          <PieChart
            data={chartActiveLoan}
            angleField="cnt"
            colorField="name" 
            colors={['#ec7b00','#fab200','#fdce00','#ffe925']}
          />
          </Card>
        </Col>
        <Col span={screens.xl ? 12 : 24} style={{marginBottom:"20px"}}>
        <Card title={<span style={{ color: "black", fontSize: "20px" }}>Хугацаа хэтэрсэн зээл</span>} >
          <PieChart
            data={data1}
            angleField="cnt"
            colorField="name"
            colors={['#2f6d00','#488105','#62960c','#7dab14','#9ac01b','#b8d523','#d8ea2b','#f9ff34',]}
          />
          </Card>
        </Col>
      </Row>
      <Row  gutter={16}>
        <Col span={screens.xl ? 12 : 24} style={{marginBottom:"20px"}}>
          <Card title={<span style={{ color: "black", fontSize: "20px" }}>Зээлийн хүсэлт</span>} >
          <ColumnChart
            data={data2}
            xField= 'city'
            yField= 'value'
            seriesField= 'type'
          />
          </Card>
        </Col>
        <Col span={screens.xl ? 12 : 24} style={{marginBottom:"20px"}}>
        <Card title={<span style={{ color: "black", fontSize: "20px" }}>Зээл олголт</span>} >
          <ColumnChart
            data={chartLoanIssued}
            xField= 'date'
            yField= 'value'
            seriesField= 'type'
            colors={['#d86119','#f9b520']}
          />
          </Card>
        </Col>
      </Row>
      <Row  gutter={16} >
        <Col span={24} style={{marginBottom:"20px"}}>
          <Card title={<span style={{ color: "black", fontSize: "20px" }}>Сунгасан зээлүүд</span>} >
          <PieChart
            data={data1}
            angleField="cnt"
            colorField="name"
            colors={['#62960c','#7dab14','#9ac01b','#b8d523','#d8ea2b','#f9ff34',]}
          />
          </Card>
        </Col>
      </Row>
      <Row  gutter={16} >
        <Col span={screens.xl ? 12 : 24} style={{marginBottom:"20px"}}>
          <Card  title={<span style={{ color: "black", fontSize: "18px" }}>Байршлаар (Аймаг/Хот)</span>}>
          <BarChart
            data={chartAimag}
            xField="cnt"
            yField="name"
            onReady={onReady}
          />
          </Card>
        </Col>
        <Col span={screens.xl ? 12 : 24} style={{marginBottom:"20px"}}>
          <Card  title={<span style={{ color: "black", fontSize: "18px" }}>Байршлаар (Сум/Дүүрэг)</span>}>
            <BarChart 
              data={chartSoum}  
              xField="cnt" 
              yField="name" 
            />
          </Card>
        </Col>
      </Row>
      <Row  gutter={16}>
        <Col span={screens.xl ? 12 : 24} style={{marginBottom:"20px"}}>
          <Card  title={<span style={{ color: "black", fontSize: "18px" }}>Хүйсээр</span>}>
          <PieChart
            data={chartGender}
            angleField="cnt"
            colorField="name"
            colors={['#0c81bc','#00b5e1',]}
          />
          </Card>
        </Col>
        <Col span={screens.xl ? 12 : 24} style={{marginBottom:"20px"}}>
          <Card  title={<span style={{ color: "black", fontSize: "18px" }}>Банкааар</span>}>
            <ColumnChart
              opacity='1'
              data={chartBank}
              xField= 'name'
              yField= 'cnt'
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default IndexPageMoreInfo;
