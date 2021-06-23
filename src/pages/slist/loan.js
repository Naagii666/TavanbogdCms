import { useRouter } from "next/router";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import Datatable from "@components/Datatable";
import MainLayout from "@components/layouts/MainLayout";

const Users = () => {
  const code = "loan";
  const router = useRouter();
  
  const handleDtAction = (type, _record) => {
    if (type === "show") {
      router.push("/loan/" + _record.id)
    } else if (type === "loanContract") {
      console.log(_record.pdf1);
    } else if (type === "extendContract") {
      console.log(_record.pdf2);
    }
  };

  return (
    <MainLayout>
      <Datatable
        code={code}
        addOperations={[
          {
            title: "Үзэх",
            color: "#1B98F5",
            key: "show",
            icon: EyeOutlined,
          },
          {
            title: "Зээлийн гэрээ",
            color: "#52c41a",
            key: "loanContract",
            icon: DownloadOutlined,
          },
          {
            title: "Сунгалтын гэрээ",
            color: "#faad14",
            key: "extendContract",
            icon: DownloadOutlined,
          },
        ]}
        handleDtAction={handleDtAction}
        opWidth="10%"
      />
    </MainLayout>
  );
};

export default Users;
