import {PlusCircleOutlined,} from "@ant-design/icons";
import Datatable from "@components/Datatable";
import MainLayout from "@components/layouts/MainLayout";
import { useRouter } from 'next/router';
import Context from "@context/Context";
import {useContext} from "react";
const Call = () => {
  const code = "call"
  const router = useRouter();
  const ctx = useContext(Context);
  const handleDtAction = (type) => {
   if (type === "callCreate") {
      router.push(`/call/create`);
    }
  };

  return (
    <MainLayout>
      <Datatable
        code={code}
        addListItem={
          ctx.checkPermission("	CALL_REG_CREATE") ?
          [
          {
            label: "Бүртгэх",
            key: "callCreate",
            icon: PlusCircleOutlined,
            className: "add-btn",
          },
        ]:[]}
        handleDtAction={handleDtAction}
        opWidth="10%"
      />
    </MainLayout>
  );
};

export default Call;
