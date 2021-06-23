import { useRouter } from "next/router";
import Datatable from "@components/Datatable";
import MainLayout from "@components/layouts/MainLayout";

const Users = () => {
  const code = "loan";
  const router = useRouter();
  
  const handleDtAction = (type, _record) => {
    if (type === "loanScoreReport") {
      console.log("loanScoreReport")
    }
  };

  return (
    <MainLayout>
      <Datatable
        code={code}
        addListItem={[
          {
            label: "Зээлийн эрх нэмсэн тайлан",
            width: "200px",
            key: "loanScoreReport",
            className: "add-btn",
          },
        ]}
        handleDtAction={handleDtAction}
        opWidth="10%"
      />
    </MainLayout>
  );
};

export default Users;
