import { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button, Space, Typography } from "antd";
import moment from "moment";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { callGet, apiList, execData } from "@api/api";
import FormBuild from "./FormBuild";
import MultiFormBuild from "./MultiFormBuild";
import { showMessage } from "@utils/message";
import { messageType, dataType, defaultMsg } from "@constants/constants";
import Context from "@context/Context";

const { Title } = Typography;

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

const CustomForm = ({ code, editData, onFinishSuccess }) => {
  const ctx = useContext(Context);
  const [items, setItems] = useState([]);
  const [childItems, setChildItems] = useState([]);
  const [childInitialValues, setChildInitialValues] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const getForm = async () => {
      ctx.setIsLoading(true);
      const result = await callGet(`${apiList.formInfo}/${code}`);
      const tmpItems = result.parentConfig;
      const tmpChildItems = result.childConfigs;

      if (editData === undefined) {
        editData = {};
      }

      form.resetFields();

      form.setFieldsValue({
        id: editData["id"],
      });
      tmpItems.map((item) => {
        form.setFieldsValue({
          [item.name]: editData[item.name] || filterCase(item),
        });
      });

      let tmpInitialValues = {};
      tmpChildItems.map((childItem) => {
        let tmpConfig = { id: editData[`${childItem.code.toLowerCase()}_id`] };
        childItem.config.map((childItemConfig) => {
          tmpConfig[childItemConfig.name] = filterCase(childItemConfig);
        });
        tmpInitialValues[childItem.code] = [tmpConfig];
      });

      setChildInitialValues(tmpInitialValues);
      setItems(tmpItems);
      setChildItems(tmpChildItems);

      form.setFieldsValue({
        child: tmpInitialValues,
      });
      ctx.setIsLoading(false);
    };

    getForm();
  }, [editData]);

  const filterCase = (item) => {
    const type = item.type;
    switch (type) {
      case dataType.NUMBER:
      case dataType.SELECT:
      case dataType.CHECKBOX:
        return (
          editData[item.name] ||
          (item.defaultVal != null ? Number(item.defaultVal) : null)
        );
      default:
        return editData[item.name] || item.defaultVal;
    }
  };

  const onFinish = async (values) => {
    ctx.setIsLoading(true);
    let childData = [];
    if (values.child !== undefined) {
      Object.keys(values.child).forEach(function (k) {
        childData.push({
          code: k,
          data: values.child[k],
        });
      });
      delete values.child;
    }

    Object.entries(values).map(([key, value]) => {
      if (moment.isMoment(value)) {
        if (key.endsWith("time"))
          values[key] = value.format("YYYY-MM-DD HH:mm:ss");
        else values[key] = value.format("YYYY-MM-DD");
      }
    });

    const result = await execData(code, values, childData);
    if (result && result.status === messageType.SUCCESS.type && typeof onFinishSuccess === 'function') {
      onFinishSuccess();
    }
    ctx.setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    showMessage(messageType.WARNING.type, defaultMsg.formErrorTxt);
    return;
  };

  return (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row>
        <Col md={24}>
          <FormBuild items={items} form={form} />
        </Col>
      </Row>

      {childItems &&
        childItems.map((child) => {
          return (
            <div key={child.code}>
              {child.isMulti === 1 && <Title level={3}>{child.name}</Title>}
              <Form.List name={["child", child.code]}>
                {(fields, { add, remove }) => (
                  <>
                    {child.isMulti === 1 && (
                      <Form.Item>
                        <Button
                          type="primary"
                          onClick={() => add(childInitialValues[child.code][0])}
                          icon={<PlusOutlined />}
                        >
                          Нэмэх
                        </Button>
                      </Form.Item>
                    )}
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div key={key}>
                        {child.isMulti === 1 ? (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            <MultiFormBuild
                              items={child.config}
                              formCode={name}
                            />
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ) : (
                          <Row>
                            <Col md={24}>
                              <FormBuild items={child.config} formCode={name} />
                            </Col>
                          </Row>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </Form.List>
            </div>
          );
        })}

      <Form.Item wrapperCol={{ sm: 22 }}>
        <Button
          loading={ctx.isLoading}
          style={{ float: "right", marginTop: "40px" }}
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
        >
          Хадгалах
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
