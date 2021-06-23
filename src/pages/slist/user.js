import { useState, useContext } from "react";
import { Button, Popconfirm } from "antd";
import { HighlightOutlined, DownloadOutlined } from "@ant-design/icons";

import Context from "@context/Context";
import Datatable from "@components/Datatable";
import MainLayout from "@components/layouts/MainLayout";
import MainModal from "@components/MainModal";
import { sList, apiList, execData, callGet } from "@api/api";

const Users = () => {
  const ctx = useContext(Context);
  const code = "user";

  const [markingModalShow, setMarkingModalShow] = useState(false);
  const [downloadConfirmShow, setDownloadConfirmShow] = useState(false);

  const handleDtAction = (type, _record) => {
    if (type === "setMark") {
      setMarkingModalShow(true);
    } else if (type === "download") {
      setDownloadConfirmShow(true);
    }
  };

  const handleMarkingOk = () => {
    setMarkingModalShow(false);
  };

  const handleMarkingCancel = () => {
    setMarkingModalShow(false);
  };

  const handleDownloadOk = () => {
    setDownloadConfirmShow(false);
  } 

  const handleDownloadCancel = () => {
    setDownloadConfirmShow(false);
  }

  return (
    <MainLayout>
      <Datatable
        title={code}
        code={code}
        addOperations={[
          {
            title: "Тэмдэглэгээ хийх",
            color: "#1B98F5",
            key: "setMark",
            icon: HighlightOutlined,
          },
          {
            title: "ЗМС татах",
            color: "#EB4D4B",
            key: "download",
            icon: DownloadOutlined,
          },
        ]}
        handleDtAction={handleDtAction}
        opWidth="10%"
      />
      <MainModal
        visible={markingModalShow}
        onOk={handleMarkingOk}
        onCancel={handleMarkingCancel}
        width="1000px"
        title="Тэмдэглэгээ хийх"
      ></MainModal>
      <MainModal
        visible={downloadConfirmShow}
        onOk={handleDownloadOk}
        onCancel={handleDownloadCancel}
        width="1000px"
        title="Анхааруулга"
        okTitle="Тийм"
        cancelTitle="Үгүй"
      ></MainModal>
    </MainLayout>
  );
};

export default Users;
