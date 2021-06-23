import { DeleteFilled , SafetyCertificateFilled } from '@ant-design/icons';
import { loanRequestListWaiting } from '@constants/listinfo/loanRequestListWaiting';
import Datatable from '@components/Datatable';
import MainLayout from "@components/layouts/MainLayout";

const LoanRequestListWaiting = () => {

  const handleDtAction = (type, _record) => {
    if (type === "cancel") {
      console.log("cancel");
    } else if (type === "matchable") {
      console.log("matchable")
    }
  };

  return (
    <MainLayout>
      <Datatable 
        code="loanRequestWaiting" 
        info={loanRequestListWaiting} 
        addOperations={[
          {
            title: "Цуцлах",
            color: "#EB4D4B",
            key: "cancel",
            icon: DeleteFilled,
          },
          {
            title: "Matchable",
            color: "#1B98F5",
            key: "matchable",
            icon: SafetyCertificateFilled,
          },
        ]}
        handleDtAction={handleDtAction}
        opWidth="10%"
      />
    </MainLayout>
  )
}

export default LoanRequestListWaiting;