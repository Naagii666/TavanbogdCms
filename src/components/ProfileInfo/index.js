import { Form, Input, Button, Grid, Row, Col, Image } from "antd";

const ProfileInfo = ({ data }) => {

  const screens = Grid.useBreakpoint();

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
      <Col span={screens.xl ? 12 : 24}>
        {data &&
          <Form {...layout}>
            <Form.Item label="Овог">
              <Input value={data.last_name} />
            </Form.Item>
            <Form.Item label="Нэр">
              <Input value={data.first_name} />
            </Form.Item>
            <Form.Item label="И-мэйл" >
              <Input value={data.username} />
            </Form.Item>
            <Form.Item label="Утас" >
              <Input value={data.username} />
            </Form.Item>
          </Form>
        }
      </Col>
    </Row>
    </>
  )
}

export default ProfileInfo;