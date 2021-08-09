import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import auth_cookie from '@utils/auth';
import { login } from '@api/auth';
import { callPost } from '@api/api';
import { messageType, defaultMsg } from '@constants/constants';
import { showMessage } from "@utils/message";
import Context from '@context/Context';

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
    offset: 14,
    span: 16,
  },
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch, setMenuAndPermissions } = useContext(Context);
  const { auth } = state;
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmCode, setConfirmCode] = useState(null);
  const [form] = Form.useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onFinish = async (values) => {
    setLoading(true);
    const res = await login(values);
    if (res.response || res.data === undefined) {
      console.log(res.response)
      if (res.response.data.error === "unauthorized") {
        setModalVisible(true);
        showMessage(messageType.FAILED.type, defaultMsg.newDeviceConfirmErrorTxt);
      } else {
        showMessage(messageType.FAILED.type, defaultMsg.loginErrorTxt);
      }
      setLoading(false);
      return;
    }

    dispatch({
      type: 'AUTH',
      payload: {
        user: res.data,
      },
    });

    showMessage(messageType.SUCCESS.type, defaultMsg.loginSuccessTxt);
    auth_cookie.setToken(res?.data?.access_token, res?.data?.expires_in);
    setMenuAndPermissions();
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/');
  }, [auth]);

  const handleConfirm = async () => {
    try {
      await form.validateFields();
      callPost("confirmCode", confirmCode);
      form.resetFields();
      setModalVisible(false);
      handleSubmit();
    } catch (e) { }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        {/* <img src="/logo.png" alt="logo" className="loginImg" /> */}
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onSubmit={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Нэвтрэх нэрээ оруулна уу',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              style={{ width: '250px' }}
              placeholder="Нэвтрэх нэр"
              name="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Нууц үгээ оруулна уу',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              style={{ width: '250px' }}
              placeholder="**************"
              name="password"
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="loginBtn"
            >
              Нэвтрэх
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
          key="confirm"
          visible={modalVisible}
          onCancel={() => {setModalVisible(false),form.resetFields()}}
          footer={[
            <Button key="confirmButton" type="primary" onClick={handleConfirm}>
              Баталгаажуулах
            </Button>,
        ]}
      >
        <Form
          key="confirmForm"
          form={form}
          style={{
            width: "230px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <p key="name" style={{ fontSize: "20px" }}>
            Баталгаажуулах код оруулна уу
            </p>
          <Form.Item
            name="confirmCode"
            rules={[
              {
                required: true,
                message: "Заавал бөглөх талбар.",
              },
            ]}
          >
            <Input
              key="code"
              name="confirmCode"
              onChange={(e) => {
                setConfirmCode(e.target.value);
              }}
              placeholder="Баталгаажуулах код..."
              allowClear={true}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;