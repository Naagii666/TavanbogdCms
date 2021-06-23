import { useRouter } from "next/router";
import { EyeOutlined } from "@ant-design/icons";
import Datatable from "@components/Datatable";
import MainLayout from "@components/layouts/MainLayout";

const Users = () => {
  const code = "loanIssued";
  const router = useRouter();
  
  const handleDtAction = (type, _record) => {
    if (type === "show") {
      router.push("/loan/" + _record.id)
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
          }
        ]}
        handleDtAction={handleDtAction}
        opWidth="10%"
      />
    </MainLayout>
  );
};

export default Users;
