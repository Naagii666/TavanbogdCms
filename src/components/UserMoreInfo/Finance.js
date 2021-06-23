import { Form, Input, Button, Grid, Row, Col, Divider } from "antd";

const FinanceInfo = ({ data }) => {

  const layout = {
    labelCol: {
      span: 12,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 24,
    },
  };

  return (
    <>
      <Row>
        {data && (
          <Col span={24}>
            <Form {...layout}>
              <Form.Item label="Зээлдэгчийн орлого">
                <Input value={data.income} />
              </Form.Item>
              <Form.Item label="Өрхийн бусад зээл хүүний зардал (Хэрэглээ орохгүй)">
                <Input value={data.outcome} />
              </Form.Item>
              <Form.Item label="Сарын хэрэглээний зарлага">
                <Input value={data.outcome_month} />
              </Form.Item>
              <Form.Item label="Дундаж орлого">
                <Input value={data.average_income} />
              </Form.Item>
              <Form.Item label="Дундаж зарлага">
                <Input value={data.average_outcome} />
              </Form.Item>
              <Form.Item label="Зээлийн түүх 1">
                <Input value={data.loan_history1} />
              </Form.Item>
              <Form.Item label="Зээлийн түүх 2">
                <Input value={data.loan_history2} />
              </Form.Item>
            </Form>
          </Col>
        )}
      </Row>
    </>
  );
};

export default FinanceInfo;
