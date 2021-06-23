import React, { useState, useContext } from "react";
import { Card, Select, Alert, Form, Button, Input,
  Row, Col, Modal } from "antd";
import MainLayout from "@components/layouts/MainLayout";
import { CheckOutlined } from "@ant-design/icons";
import { sList,apiList,callPost } from "@api/api";
import Link from 'next/link'
import { useRouter } from 'next/router';
import Context from "@context/Context";
import { showMessage } from "../../utils/message";
import { messageType } from '@constants/constants'

const CallCreate = () => {
  const ctx = useContext(Context);
  const [form] = Form.useForm();
  const router = useRouter();
  const [info, setInfo] = useState({});
  const [userData, setUserData] = useState({});
  const [request, setRequest] = useState({});
  const [result, setResult] = useState({});
  const { confirm, warning } = Modal;

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const handleClick = async () => { 
    try {
      await form.validateFields();
      confirm({
        title: "Энэ үйлдлийг хийхдээ итгэлтэй байна уу?",
        okText: "Тийм",
        cancelText: "Үгүй",
        onOk: async() => {
          const result = await callPost(apiList.callCreate,request);
          setResult(result);
          if(result.status==="Success"){
            router.push(`/slist/call`) 
            form.resetFields()
            setUserData({});
            setRequest({});
          }
        },
      });
    } catch (e) {
      warning({
        title: "Та талбараа бүрэн бөглөнө үү",
        okText: "За",
        onOk: () => {},
      });
    }
  };
  const handleKeyDown = async (event) => {
    if (event.key === "Tab" || event.key === "Enter") {
      setUserData({});
      ctx.setIsLoading(true);
      const result = await sList({ code:apiList.callRegUserInfo,
      customFilter:[
        {
          key:"username",
          val:info.p2,
          type:"text"
        }
      ] });
      if(result.data[0]!==undefined){
        setUserData(result.data[0]) 
        setRequest({...request, userId:result.data[0].id})
      }else{
        showMessage(messageType.WARNING.type, "Бүртгэлтэй харилцагч олдсонгүй.")
      }
      ctx.setIsLoading(false);
    }
  };

  return (
    <MainLayout className="main-content-no-back">
      <Card
        title={
          <span style={{ color: "black", fontSize: "18px" }}>
            Дуудлагын мэдээлэл
          </span>
        }
      >
        <Row>
          <Col span={18} offset={3}>
            <Alert
              style={{ color: "red", marginBottom: "40px" }}
              message={
                <span style={{ color: "red", fontWeight: "bold" }}>
                  АНХААРУУЛГА
                </span>
              }
              description="ДУУДЛАГЫН МЭДЭЭЛЭЛ ЦОНХНЫ АЛДАА ГЭСЭН ТӨРӨЛ ДЭЭР ЗӨВХӨН ПРОГРАМТАЙ ХОЛБООТОЙ АЛДААГ ДЭЛГЭРЭНГҮЙ БҮРТГЭНЭ ҮҮ."
              type="warning"
              showIcon
            />
            <Form form={form} {...layout}>
              <Form.Item
                label="Залгасан дугаар"
                name="pnumber1"
                type="number"
                rules={[
                  {
                    required: true,
                    message: "Залгасан дугаараа оруулна уу.",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Залгасан дугаар"
                  allowClear={true}
                  onChange={(e) => {
                    setInfo({ ...info, p1: e.target.value });
                    setRequest({
                      ...request,
                      phone: e.target.value
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Бүртгэлтэй дугаар"
                name="pnumber2"
                rules={[
                  {
                    required: true,
                    message: "Бүртгэлтэй дугаар оруулна уу.",
                  },
                ]}
                onKeyDown={handleKeyDown}
              >
                <Input
                  type="number"
                  placeholder="Бүртгэлтэй дугаар"
                  allowClear={true}
                  onChange={(e) => {
                    setInfo({ 
                      ...info, 
                      p2: e.target.value 
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="Овог нэр" name="fullName">
                <Input placeholder={userData.first_name!==undefined?(`${userData.first_name} ${userData.last_name}`):"Овог нэр"}
                disabled 
                />
              </Form.Item>
              <Form.Item label="Регистрийн дугаар" name="RDnumber">
                <Input 
                placeholder={userData.register_number!==undefined?userData.register_number:"Регистрийн дугаар"}
                disabled
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 8 },
                }}
              >
                <Link
                  href={userData.id!==undefined?`/users/single/${userData.id}`:""}
                  style={{ color: "blue" }}
                  locale={false}
                >
                  Дэлгэрэнгүй мэдээлэл үзэх
                </Link>
              </Form.Item>
              <Form.Item
                name="problem"
                label="Асуудал"
                rules={[
                  {
                    required: true,
                    message: "Асуудалаа сонгоно уу",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Асуудал"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  onChange={(e) => {
                    setInfo({
                      ...info,
                      problem: e,
                    });
                    setRequest({
                      ...request,
                      callType: e
                    });
                  }}
                >
                  <Select.Option value="1">Ерөнхий мэдээлэл</Select.Option>
                  <Select.Option value="2">Зээлийн эрх</Select.Option>
                  <Select.Option value="3">Зээл олголт</Select.Option>
                  <Select.Option value="4">Сунгалт</Select.Option>
                  <Select.Option value="5">Эргэн төлөлт</Select.Option>
                  <Select.Option value="6">Алдаа</Select.Option>
                  <Select.Option value="7">Санал хүсэлт</Select.Option>
                  <Select.Option value="8">Бусад</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Тайлбар"
                name="desc"
                rules={[
                  {
                    required: true,
                    message: "Тайлбараа оруулна уу.",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Тайлбар..."
                  allowClear={true}
                  onChange={(e) => {
                    setInfo({ 
                      ...info, 
                      desc: e.target.value 
                    });
                    setRequest({ 
                      ...request, 
                      description: e.target.value 
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 8 },
                }}
              >
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={handleClick}
                >
                  Хадгалах
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </MainLayout>
  );
};
export default CallCreate;
