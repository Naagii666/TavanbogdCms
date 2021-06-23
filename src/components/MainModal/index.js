import { Button, Modal } from "antd";
import Context from "@context/Context";
import { useContext, useState } from "react";

const MainModal = ({
  title,
  children,
  visible,
  width,
  onOk,
  onCancel,
  footer,
  okTitle,
  cancelTitle
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOk = () => {
    onOk(setIsLoading);
  };

  const handleCancel = () => {
    onCancel(setIsLoading);
  };

  return (
    <Modal
      title={<b style={{ textTransform: "uppercase" }}>{title}</b>}
      visible={visible}
      width={width || "700px"}
      onCancel={handleCancel}
      footer={
        footer !== null
          ? [
              <Button key="back" onClick={handleCancel}>
                {cancelTitle ? cancelTitle : "Хаах"}
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isLoading}
                onClick={handleOk}
              >
                {okTitle ? okTitle : "Хадгалах"}
              </Button>,
            ]
          : null
      }
    >
      {children}
    </Modal>
  );
};

export default MainModal;
