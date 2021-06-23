import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import Datatable from "@components/Datatable";
import MainLayout from "@components/layouts/MainLayout";
import MainModal from "@components/MainModal";

const Banner = () => {
  const code = "banner";
  const [image, setImage] = useState();
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const handleDtAction = (type, _record) => {
    if(type === "image") {
      setImage(_record.image);
      setIsImageModalVisible(true);
    }
  };

  return (
    <MainLayout>
      <Datatable
        code={code}
        addOperations={[
          {
            title: "Зураг харах",
            color: "#1B98F5",
            key: "image",
            icon: EyeOutlined,
          },
        ]}
        handleDtAction={handleDtAction}
      />
      <MainModal
        title="Зураг"
        visible={isImageModalVisible}
        width="80%"
        onCancel={() => setIsImageModalVisible(false)}
      >
        <img src={`data:image/png;base64, ${image}`} width="100%" />
      </MainModal>
    </MainLayout>
  );
};

export default Banner;
