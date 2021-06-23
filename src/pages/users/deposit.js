import { Table, Form, Input, Alert, Button, Modal, Row, Col } from "antd";
import MainLayout from "@components/layouts/MainLayout";
import { useState, useContext } from "react";
import { SaveOutlined } from "@ant-design/icons";
import Data from "@components/Data";

import { sList, apiList } from "@api/api";
import Context from "@context/Context";
const Deposit = () => {
  const ctx = useContext(Context);
  const { confirm, warning } = Modal;
  const [form] = Form.useForm();
  const [infoVisible, setInfoVisible] = useState(false);
  const [depData, setDepData] = useState([]);
  const [depNotif, setdepNotif] = useState([]);
  const [qpayInvoices, setqpayInvoices] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: "Гарчиг",
      dataIndex: "name",
      key: "name",
      width:"20%"
    },
    {
      title: "Тайлбар",
      dataIndex: "log_desc",
      key: "log_desc",
    },
    {
      title: "Огноо",
      dataIndex: "created_at",
      key: "created_at",
      defaultSortOrder: 'descend',
      width:"17%",
      textAlign: "right",
    },
  ])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
    showSizeChanger: true,
    showTotal: (total, range) =>
      `(Нийт ${total}) ${range[0]} ээс ${range[1]} харагдаж байна.`,
    pageSizeOptions: [ 50,100, 500, 1000, 5000],
    locale: {
      items_per_page: "",
      prev_page: "Өмнөх хуудас",
      next_page: "Дараагийн хуудас",
    },
  });
  const handleTableChange = async (_pagination) => {
    setPagination((pagination) => ({
      ...pagination,
      current: _pagination.current,
      pageSize: _pagination.pageSize,
    }));
  };
  const handleKeyDown = async (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      ctx.setIsLoading(true);
      const depNotifResult = await sList({
        code: apiList.userDepositNotification,
        customFilter: [{ key: "username", val: depData.pnumber, type: "text" }],
        sort:[{colId:"created_at",sort:"desc"}]
      });
      setdepNotif(depNotifResult?.data);
      const qPayResult = await sList({
        code: apiList.userDepositQPayInvoices,
        customFilter: [{ key: "username", val: depData.pnumber, type: "text" }],
        sort:[{colId:"created_at",sort:"desc"}]
      });
      setqpayInvoices(qPayResult?.data);
      console.log(qPayResult?.data);
      setInfoVisible(true);

      setColumns([{
        title: "№",
        key: "index",
        align: "center",
        render: (text, record,index) => index + 1,
      },...columns])
      ctx.setIsLoading(false);
    }
  };

  const handleClick = async () => {
    try {
      await form.validateFields();
      confirm({
        title: "Энэ үйлдлийг хийхдээ итгэлтэй байна уу?",
        okText: "Тийм",
        cancelText: "Үгүй",
        onOk: () => {
          form.resetFields();
          setInfoVisible(false);
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
  return (
    <MainLayout title="Орлого хийх" className="main-content">
      <Row gutter={20}>
        <Col className="gutter-row" span={9}>
          <Alert
            message="Анхааруулга"
            description="QPAY-гээс болж хэтэвч нь цэнэглэгдээгүй үед гараас цэнэглэж байгаа бол тухайн гүйлгээг check хийж хадгална уу. Check хийгээгүй тохиолдолд гүйлгээ давхардаж орно."
            type="warning"
            showIcon
          />
          <Form form={form} layout="vertical">
            <Form.Item
              label="Утасны дугаар"
              name="pnumber"
              rules={[
                {
                  required: true,
                  message: "Утасны дугаараа оруулна уу.",
                },
              ]}
            >
              <Input
                placeholder="Утасны дугаар..."
                onKeyDown={handleKeyDown}
                type="number"
                onChange={(e) => {
                  setDepData({ ...depData, pnumber: e.target.value });
                }}
                allowClear={true}
              />
            </Form.Item>
            <Form.Item
              label="Мөнгөн дүн"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Мөнгөн дүнгээ оруулна уу.",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Мөнгөн дүн..."
                allowClear={true}
              />
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
              <Input.TextArea placeholder="Тайлбар" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleClick}
              >
                Орлого хийх
              </Button>
            </Form.Item>
            <Form.Item>
              {infoVisible
                ? qpayInvoices.map((e, i) => {
                    return (
                      <Data
                        key={i}
                        Date={e.created_at}
                        title={`${e.amount}-${e.invoice_code}`}
                        details={e.status}
                        checkbox={true}
                      />
                    );
                  })
                : null}
            </Form.Item>
          </Form>
        </Col>
        <Col className="gutter-row" span={15}>
          {infoVisible ? (
            <Table
              columns={columns}
              dataSource={depNotif}
              pagination={pagination}
              onChange={handleTableChange}
            />
          ) : 
          null}
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Deposit;
