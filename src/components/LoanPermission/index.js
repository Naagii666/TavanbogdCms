import { useState, useEffect, useContext } from "react";
import {
  Input,
  Checkbox,
  Row,
  Col,
  Divider,
  Grid,
  Form,
  Modal,
  TextArea,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { sList } from "@api/api";
import Context from "@context/Context";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const LoanCredit = ({ filter }) => {
  const ctx = useContext(Context);
  const [data, setData] = useState({
    id: null,
    cangiveloan: null,
    cantakeloan: null,
    loanlimit: null,
    lendlimit: null,
    groupid: null,
    scoreamt: null,
  });
  const [lendLimit, setLendLimit] = useState(0);
  const [loanLimit, setLoanLimit] = useState(0);
  const [anket, setAnket] = useState();
  const [lendPermissionReason, setLendPermissionReason] = useState();
  const [loanPermissionReason, setLoanPermissionReason] = useState();

  const [canGiveLoan, setCanGiveLoan] = useState(false);
  const [canTakeLoan, setCanTakeLoan] = useState(false);

  const screens = Grid.useBreakpoint();

  useEffect(() => {
    (async () => {
      ctx.setIsLoading(true);
      const res = await sList({
        code: "userLoanPermission",
        filter: {
          id: {
            filter: filter,
            filterType: "number",
            type: "equals",
          },
        },
      });
      setData(res.data[0]);
      ctx.setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    setLendLimit(data.lendlimit);
    setLoanLimit(data.loanlimit);
    setCanGiveLoan(data.cangiveloan === 1 ? true : false);
    setCanTakeLoan(data.canTakeLoan === 1 ? true : false);
  }, [data]);

  const lendPermissionHandler = () => {
    Modal.confirm({
      title: "Анхааруулга!",
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <p>Та уг үйлдлийг хийхэд итгэлтэй байна уу?</p>
          <Input.TextArea
            placeholder="Шалтгаан..."
            autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={(e) => setLendPermissionReason(e.target.value)}
          />
        </>
      ),
      onOk: () => console.log(canTakeLoan, canGiveLoan),
      okText: "Тийм",
      cancelText: "Үгүй",
    });
  };

  const loanPermissionHandler = () => {
    Modal.confirm({
      title: "Анхааруулга!",
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <p>Та уг үйлдлийг хийхэд итгэлтэй байна уу?</p>
          <Input.TextArea
            placeholder="Шалтгаан..."
            autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={(e) => setLoanPermissionReason(e.target.value)}
          />
        </>
      ),
      onOk: () => console.log(canTakeLoan, canGiveLoan),
      okText: "Тийм",
      cancelText: "Үгүй",
    });
  };

  const anketHandler = () => {
    console.log(anket);
  };

  return (
    <Row>
      {data.groupid && data.scoreamt && (
        <>
          <Col span={screens.xl ? 12 : 24}>
            <Form {...layout}>
              <Form.Item label="Зээлийн нэмэлт эрх:">
                <Input value={data.scoreamt} />
              </Form.Item>
              <Form.Item label="Version:">
                <Input value={data.groupid} />
              </Form.Item>
            </Form>
          </Col>
          <Divider orientation="left"></Divider>
        </>
      )}

      <Col span={screens.xl ? 12 : 24}>
        <Form {...layout}>
          <Form.Item label="Зээл авах эрх:">
            <Input.Search
              addonBefore={
                <Checkbox
                  checked={canTakeLoan}
                  onChange={(e) => setCanTakeLoan(e.target.checked)}
                />
              }
              suffix={"₮"}
              enterButton="Хадгалах"
              value={lendLimit}
              onChange={(e) => setGiveValue(e.target.value)}
              onSearch={loanPermissionHandler}
            />
          </Form.Item>
          <Form.Item label="Зээл өгөх эрх:" valuePropName="search">
            <Input.Search
              addonBefore={
                <Checkbox
                  checked={canGiveLoan}
                  onChange={(e) => setCanGiveLoan(e.target.checked)}
                />
              }
              suffix={"₮"}
              enterButton="Хадгалах"
              value={loanLimit}
              onChange={(e) => setTakeValue(e.target.value)}
              onSearch={lendPermissionHandler}
            />
          </Form.Item>
          <Form.Item label="Анкет буцаах:">
            <Input.Search
              value={anket}
              onChange={(e) => setAnket(e.target.value)}
              enterButton="Анкет буцаах"
              onSearch={anketHandler}
            />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoanCredit;
