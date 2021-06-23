import { Descriptions, Tag, Input, Form, Checkbox, Modal, Button } from "antd";
import {
  SettingFilled,
  PlusCircleOutlined,
  SendOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { sList, apiList, execData, callGet,callPost } from "@api/api";
import ReactToPrint from "react-to-print";
import Datatable from "@components/Datatable";
import MainLayout from "@components/layouts/MainLayout";
import MainModal from "@components/MainModal";
import TableTransfer from "@components/TableTransfer";
import { showMessage } from "@utils/message";
import { messageType, defaultMsg } from "@constants/constants";
import { useContext, useState, useRef } from "react";
import Context from "@context/Context";
import LoanReport from "@report/LoanReport";

const { TextArea } = Input;
const tableColumns = [
  {
    dataIndex: "code",
    key: "code",
    title: "Код",
    render: (code) => <Tag>{code}</Tag>,
  },
  {
    dataIndex: "name",
    key: "name",
    title: "Нэр",
  },
];
const RoleManage = () => {
  const ctx = useContext(Context);
  const code = "role";
  const [permissionList, setPermissionList] = useState([]);
  const [oldPermissionSelectedList, setOldPermissionSelectedList] = useState(
    []
  );
  const [permissionSelectedList, setPermissionSelectedList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPushNotifVisible, setPushNotifVisible] = useState(false);
  const [isAddScoreVisible, setAddScoreVisible] = useState(false);
  const [isReportVisible, setReportVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [pushForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [pushNotifData, setpushNotifData] = useState({});
  const [addScoreData, setAddScoreData] = useState({});
  const [loanReportData, setLoanReportData] = useState([])
  const componentRef = useRef();
  const onChange = (nextTargetKeys) => {
    setPermissionSelectedList(nextTargetKeys);
  };
  const { confirm, warning } = Modal;

  const handleDtAction = async (type, _record) => {
    if (type === "permission") {
      setRecord(_record);
      const resultPermission = await sList({ code: apiList.permission });
      const resultPermissionSelected = await sList({
        code: apiList.permissionSelected,
        customFilter: [{ key: "role_id", val: _record.id }],
      });
      if (resultPermissionSelected) {
        let selected = resultPermissionSelected.data.map((item) => item.key);
        setPermissionList(resultPermission.data);
        setPermissionSelectedList(selected);
        setOldPermissionSelectedList(
          resultPermissionSelected.data.map((item) => item.id)
        );
        setIsModalVisible(true);
      }
    } else if (type === "sendNotif") {
      {
        _record.length === 0
          ? showMessage(messageType.WARNING.type, "Хэрэглэгч сонгоогүй байна")
          : (setPushNotifVisible(true),
            setpushNotifData({ ...pushNotifData, users: _record }));
      }
    } else if (type === "addScore") {
      {
        _record.length === 0
          ? showMessage(messageType.WARNING.type, "Хэрэглэгч сонгоогүй байна")
          : (setAddScoreVisible(true),
            setAddScoreData({ ...addScoreData, users: _record }));
      }
    } else if (type === "download") {
      ctx.setIsLoading(true);
      const response = await sList({
        code: apiList.loanInfoReport,
        customFilter: [{ key: "issued_id", val: 5615314230903844 }],
      });
      setLoanReportData(response?.data)
      ctx.setIsLoading(false);
      setReportVisible(true);
    }
  };
  const handleOk = async (setModalLoading) => {
    if (permissionSelectedList.length === 0) {
      showMessage(messageType.WARNING.type, defaultMsg.permissionEmpty);
      return;
    }
    setModalLoading(true);
    ctx.setIsLoading(true);
    const data = permissionSelectedList.map((ps) => {
      return {
        permission_id: ps,
        role_id: record.id,
      };
    });
    const result = await execData(
      apiList.rolePermissionCreate,
      data,
      [],
      oldPermissionSelectedList
    );
    if (result.status === messageType.SUCCESS.type) {
      handleCancel();
      callGet(apiList.reloadPermission);
    }
    ctx.setIsLoading(false);
    setModalLoading(false);
  };
  const handlePushOk = async () => {
    try {
      await pushForm.validateFields();
      confirm({
        title: "Энэ үйлдлийг хийхдээ итгэлтэй байна уу?",
        okText: "Тийм",
        cancelText: "Үгүй",
        onOk: () => {
          callPost("pushNorif", pushNotifData),
            console.log("pushData", pushNotifData),
            pushForm.resetFields(),
            setpushNotifData({}),
            setPushNotifVisible(false);
        },
      });
    } catch (e) {
      warning({
        title: "Та талбараа бүрэн/зөв бөглөнө үү",
        okText: "За",
        onOk: () => {},
      });
    }
  };

  const handleAddOk = async () => {
    try {
      await addForm.validateFields();
      confirm({
        title: "Энэ үйлдлийг хийхдээ итгэлтэй байна уу?",
        okText: "Тийм",
        cancelText: "Үгүй",
        onOk: () => {
          {
            callPost("addScore", addScoreData),
              console.log("addScore", addScoreData),
              addForm.resetFields(),
              setAddScoreData({}),
              setAddScoreVisible(false);
          }
        },
      });
    } catch (e) {
      warning({
        title: "Та талбараа бүрэн/зөв бөглөнө үү",
        okText: "За",
        onOk: () => {},
      });
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setPushNotifVisible(false);
    setAddScoreVisible(false);
    pushForm.resetFields();
    addForm.resetFields();
  };

  const inputChange = (key, value) => {
    setpushNotifData({ ...pushNotifData, [key]: value });
  };

  const checkboxOptions = [
    { label: "SMS", value: "sms" },
    { label: "Push notification", value: "push" },
  ];
  return (
    <MainLayout>
      <Datatable
        title={code}
        code={code}
        addOperations={[
          {
            title: "Эрх тохируулах",
            color: "#109720",
            key: "permission",
            icon: SettingFilled,
          },
          {
            title: "Татах",
            color: "#109720",
            key: "download",
            icon: ArrowDownOutlined,
          },
        ]}
        addListItem={[
          {
            label: "Мэдээлэл илгээх",
            width: "150px",
            key: "sendNotif",
            icon: SendOutlined,
            className: "add-btn",
          },
          {
            label: "Эрх нэмэх",
            key: "addScore",
            icon: PlusCircleOutlined,
            className: "add-btn",
          },
        ]}
        handleDtAction={handleDtAction}
        opWidth="10%"
      />
      <MainModal
        title="Эрхийн тохиргоо хийх"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="1000px"
      >
        <div className="modal-header-wrapper">
          <Descriptions size="small" column={1}>
            <Descriptions.Item label={<b>Дүрийн нэр</b>}>
              {record.name}
            </Descriptions.Item>
            <Descriptions.Item label={<b>Дүрийн код</b>}>
              {record.code}
            </Descriptions.Item>
          </Descriptions>
        </div>

        {isModalVisible && permissionSelectedList && permissionList && (
          <TableTransfer
            style={{ marginTop: "20px" }}
            dataSource={permissionList}
            targetKeys={permissionSelectedList}
            showSearch={true}
            onChange={onChange}
            filterOption={(inputValue, item) =>
              item.code.toLowerCase().indexOf(inputValue.toLowerCase()) !==
                -1 ||
              item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
            }
            leftColumns={tableColumns}
            rightColumns={tableColumns}
          />
        )}
      </MainModal>
      {/* Push notification modal */}
      <MainModal
        title="Push notification илгээх"
        visible={isPushNotifVisible}
        onOk={handlePushOk}
        onCancel={handleCancel}
        width="800px"
        okTitle="Илгээх"
      >
        <Form form={pushForm} layout="vertical">
          <Form.Item
            label="Илгээх мэдээлэл-SMS"
            name="sms"
            rules={[
              {
                required: true,
                message: "Заавал бөглөх талбар",
              },
              {
                min: 30,
                message: "Урт текст оруулна уу.",
              },
              {
                max: 150,
                message: "150 тэмдэгтээс бага текст оруулна уу.",
              },
            ]}
          >
            <TextArea onChange={(e) => inputChange("sms", e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Илгээх мэдээлэл-PUSH NOTIFICATION TITLE"
            name="title"
            rules={[
              {
                required: true,
                message: "Заавал бөглөх талбар",
              },
              {
                min: 5,
                message: "Урт текст оруулна уу.",
              },
            ]}
          >
            <TextArea onChange={(e) => inputChange("title", e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Илгээх мэдээлэл-PUSH NOTIFICATION BODY"
            name="body"
            rules={[
              {
                required: true,
                message: "Заавал бөглөх талбар",
              },
              {
                min: 30,
                message: "Урт текст оруулна уу.",
              },
            ]}
          >
            <TextArea onChange={(e) => inputChange("body", e.target.value)} />
          </Form.Item>
          <Form.Item label="Илгээх суваг">
            <Checkbox.Group
              options={checkboxOptions}
              value={pushNotifData.sendType}
              onChange={(checkedValues) => {
                setpushNotifData({ ...pushNotifData, sendType: checkedValues });
              }}
            />
          </Form.Item>
        </Form>
      </MainModal>
      {/* Erh nemeh modal */}
      <MainModal
        title="Зээлийн эрх нэмэх"
        visible={isAddScoreVisible}
        onOk={handleAddOk}
        onCancel={handleCancel}
        width="600px"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            label="Зээлийн эрх"
            name="amount"
            rules={[
              {
                required: true,
                message: "Заавал бөглөх талбар",
              },
            ]}
          >
            <Input
              type="number"
              onChange={(e) => {
                setAddScoreData({ ...addScoreData, amount: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Дуусах огноо"
            name="date"
            rules={[
              {
                required: true,
                message: "Заавал бөглөх талбар",
              },
            ]}
          >
            <Input
              type="date"
              onChange={(e) => {
                setAddScoreData({ ...addScoreData, date: e.target.value });
              }}
            />
          </Form.Item>
        </Form>
      </MainModal>
      <Modal
        title="Зээлийн тайлан "
        visible={isReportVisible}
        width={850}
        onCancel={()=>setReportVisible(false)
        }
        footer={[
          <ReactToPrint
            key="convert"
            trigger={() => (

              <Button
                key="download"
                type="primary"
                style={{
                  textAlign: "center",
                  whiteSpace: "pre-wrap",
                }}
              >
                Татах
              </Button>
            )}
            content={() => componentRef.current}
          />,
          <Button
            key="cancel"
            style={{ width: "80px" }}
            onClick={() => setReportVisible(false)}
          >
            Хаах
          </Button>,
        ]}
      >
        <LoanReport key="loanReport" data={loanReportData[0]} ref={componentRef} />
      </Modal>
    </MainLayout>
  );
};

export default RoleManage;
