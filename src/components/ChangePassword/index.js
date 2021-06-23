import { Form, Input, Button, Modal, Grid } from "antd";
import { useContext } from "react";
import Context from "@context/Context";
import { apiList, callPost } from "@api/api";
const { confirm } = Modal;

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

const ChangePassword = () => {
  const ctx = useContext(Context);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();

  const onFinish = (values) => {
    confirm({
      title: "Нууц үгээ солихдоо итгэлтэй байна уу?",
      okText: "Солих",
      cancelText: "Цуцлах",
      onOk: () => {
        changePass(values);
      }
    })
  }
  const changePass = async (values) => {
    ctx.setIsLoading(true);
    await callPost(apiList.changePassword, values);
    ctx.setIsLoading(false);
  };
  return (
    <div style={{width: screens.xl ? '50%' : '100%'}}>
      <Form name="basic" {...layout} form={form} onFinish={onFinish}>
        <Form.Item name="oldPassword" label="Нууц үг" rules={[
          {
            required: true,
            message: "Хуучин нууц үгээ оруулна уу."
          }
        ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="newPassword" label="Шинэ нууц үг" rules={[
          {
            required: true,
            message: "Шинэ нууц үгээ оруулна уу."
          }
        ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="newPasswordRepeat" label="Шинэ нууц үг давтах" rules={[
          {
            required: true,
            message: "Шинэ нууц үгээ давтана уу."
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Таны оруулсан хоёр нууц үг таарахгүй байна'));
            },
          }),
        ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">Солих</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ChangePassword;