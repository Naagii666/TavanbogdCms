import { useState, useContext } from "react";
import { Form, Input } from "antd";
import { FormOutlined } from "@ant-design/icons";
import Datatable from "@components/Datatable";
import MainLayout from "@components/layouts/MainLayout";
import MainModal from "@components/MainModal";
import { apiList, callPost } from "@api/api";

const Users = () => {
  const code = "conf";
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
    },
  };

  const handleDtAction = (type, _record) => {
    if (type === "update") {
      form.setFieldsValue({
        code: _record.code,
        codeMn: _record.name,
        value: _record.value,
      });
      setShowModal(true);
    }
  };

  const updateConfig = async () => {
    const result = await callPost(apiList.configUpdate, form.getFieldsValue());
    if(result.status === "Success") {
      setReload(prev => !prev);
      setShowModal(false);
    }
  }

  return (
    <MainLayout>
      <Datatable
        title={code}
        code={code}
        addOperations={[
          {
            title: "Засах",
            color: "#1B98F5",
            key: "update",
            icon: FormOutlined,
          },
        ]}
        handleDtAction={handleDtAction}
        opWidth="10%"
        reload={reload}
      />
      <MainModal
        visible={showModal}
        onOk={updateConfig}
        onCancel={() => setShowModal(false)}
        width="1000px"
        title="Тохиргоо"
      >
        <Form form={form} {...layout}>
          <Form.Item label="Код" name="code">
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="Нэр"
            name="codeMn"
            rules={[
              {
                required: true,
                message: "Нэр нь заавал бөглөх талбар байна.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Утга"
            name="value"
            rules={[
              {
                required: true,
                message: "Утга нь заавал бөглөх талбар байна.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </MainModal>
    </MainLayout>
  );
};

export default Users;
