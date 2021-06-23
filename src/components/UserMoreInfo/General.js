import { Form, Input, Button, Grid, Row, Col, Divider } from "antd";

const UserGeneralInfo = ({ data }) => {
  
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
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
            <>
            <Col span={24}>
              <Form {...layout}>
                <Form.Item label="Регистерийн дугаар">
                  <Input value={data.register_number} />
                </Form.Item>
                <Form.Item label="Овог">
                  <Input value={data.last_name} />
                </Form.Item>
                <Form.Item label="Нэр">
                  <Input value={data.first_name} />
                </Form.Item>
                <Form.Item label="И-мэйл">
                  <Input value={data.email} />
                </Form.Item>
                <Form.Item label="Утас">
                  <Input value={data.username} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary">Засах</Button>
                </Form.Item>
              </Form>
              </Col>
              <Divider orientation="left" />
              <Col span={24}>
              <Form {...layout}>
                <Form.Item label="Гэрлэсэн эсэх">
                  <Input value={data.is_married} />
                </Form.Item>
                <Form.Item label="Өрхийн гишүүдийн тоо">
                  <Input value={data.family_count} />
                </Form.Item>
                <Form.Item label="Боловсролын зэрэг">
                  <Input value={data.education_level} />
                </Form.Item>
                <Form.Item label="Амьдарч буй сууц">
                  <Input value={data.home} />
                </Form.Item>
                <Form.Item label="Сууц өөрийн эсэх">
                  <Input value={data.is_myapartment} />
                </Form.Item>
                <Form.Item label="Иргэний үнэмлэхний нүүр">
                  <img src={data.image1} height="150" alt="Иргэний үнэмлэхний нүүр" />
                </Form.Item>
                <Form.Item label="Иргэний үнэмлэхний ар">
                  <img src={data.image2} height="150" alt="Иргэний үнэмлэхний ар" />
                </Form.Item>
              </Form>
              </Col>
            </>
          )}
      </Row>
    </>
  );
};

export default UserGeneralInfo;
