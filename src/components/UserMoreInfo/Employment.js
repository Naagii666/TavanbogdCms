import { Form, Input, Button, Grid, Row, Col, Divider } from "antd";

const EmploymentInfo = ({ data }) => {

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
              <Form.Item label="Бизнесийн салбар">
                <Input value={data.business_sector} />
              </Form.Item>
              <Form.Item label="Нийт ажилласан жил">
                <Input value={data.worked_year} />
              </Form.Item>
              <Form.Item label="Нийт ажилласан байгууллагын тоо">
                <Input value={data.company_count} />
              </Form.Item>
              <Form.Item label="Одоо ажиллаж байгаа байгууллагын нэр">
                <Input value={data.company_name} />
              </Form.Item>
              <Form.Item label="Ажилласан жил">
                <Input value={data.worked_year_in_company} />
              </Form.Item>
            </Form>
          </Col>
        )}
      </Row>
    </>
  );
};

export default EmploymentInfo;
