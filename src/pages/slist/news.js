import { Form, Input, Upload, Button, message } from "antd";
import { EditFilled, PlusCircleOutlined, SelectOutlined } from "@ant-design/icons";

import Datatable from "@components/Datatable";
import MainLayout from "@components/layouts/MainLayout";
import MainModal from "@components/MainModal";
import { useContext, useState } from "react";
import Context from "@context/Context";
import dynamic from "next/dynamic";

const TextEditor = dynamic(
  () => import("@components/TextEditor"),
  { ssr: false }
)

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const News = () => {
  const ctx = useContext(Context);
  const code = "news";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState();
  const [richText, setRichText] = useState("");

  const handleDtAction = async (type) => {
    if (type === "newsAdd") {
      setIsModalVisible(true);
    } else if (type === "newsUpdate") {
      setIsModalVisible(true);
    }
  };

  const handleOk = async (setModalLoading) => {
    try {
      await form.validateFields();

      if (!form.getFieldsError().some(item => item.errors.length > 0)) {
        ctx.setIsLoading(true);

        const base64 = await convertImageToBase64(form.getFieldValue("image").file);

        console.log("Garchig: ", form.getFieldValue("title"));
        console.log("Medeenii huraangui: ", form.getFieldValue("intro"));
        console.log("Medeenii delgerengui: ", richText);
        console.log(base64);

        form.resetFields();
        setRichText(null);
        setIsModalVisible(false);
      }
    } catch (e) {
    }

    setModalLoading(false);
    ctx.setIsLoading(false);
  };

  const handleCancel = (setModalLoading) => {
    form.resetFields();
    setRichText(null);
    setIsModalVisible(false);
    setModalLoading(false);
    ctx.setIsLoading(false);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const selectImageProps = {
    onRemove: (file) => {
      setFile(null);
    },
    beforeUpload: (file) => {
      const fileWhiteList = ["image/png", "image/jpg", "image/jpeg"];
      if (fileWhiteList.filter(el => el === file.type).length === 0) {
        message.error(`Файл нь дараах форматуудын нэг байх ёстой. ${fileWhiteList.map(el => el.split("/")[1])}`);
        return Upload.LIST_IGNORE;
      }

      setFile(file);
      return false;
    },
    file,
  };

  const [form] = Form.useForm();

  return (
    <MainLayout>
      <Datatable
        title={code}
        code={code}
        addOperations={
          ctx.state.permissions.NEWS_CREATE
            ? [
              {
                title: "Засах",
                color: "#00d5dd",
                key: "newsUpdate",
                icon: EditFilled,
              },
            ]
            : []
        }
        addListItem={
          ctx.state.permissions.NEWS_CREATE
            ? [
              {
                label: "Нэмэх",
                key: "newsAdd",
                icon: PlusCircleOutlined,
                className: "add-btn"
              },
            ]
            : []
        }
        handleDtAction={handleDtAction}
        opWidth="10%"
      />

      <MainModal
        title="Мэдээ удирдах"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="1000px"
      >
        <Form {...layout} form={form}>
          <Form.Item
            label="Гарчиг"
            name="title"
            rules={[
              {
                required: true,
                message: "Гарчиг нь заавал бөглөх талбар байна.",
              },
            ]}
          >
            <Input placeholder="Гарчиг..." allowClear={true} />
          </Form.Item>
          <Form.Item
            label="Зураг"
            name="image"
            rules={[
              {
                required: true,
                message: "Зураг нь заавал бөглөх талбар байна.",
              },
            ]}
            valuePropName="file"
          >
            <Upload {...selectImageProps} maxCount={1} showUploadList={{showRemoveIcon: false}}>
              <Button icon={<SelectOutlined />}>Сонгох</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Мэдээний хураангуй"
            name="intro"
            rules={[
              {
                required: true,
                message: "Мэдээний хураангуй нь заавал бөглөх талбар байна.",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Мэдээний хураангуй"
              autoSize={true}
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            label="Мэдээний дэлгэрэнгүй"
            name="description"
          >
            <TextEditor setValue={setRichText} />
          </Form.Item>
        </Form>
      </MainModal>
    </MainLayout>
  );
};

export default News;
