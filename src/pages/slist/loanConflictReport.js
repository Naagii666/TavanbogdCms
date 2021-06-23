import loanConflictReport from '@constants/listinfo/loanConflictReport';
import Datatable from '@components/Datatable';
import MainLayout from "@components/layouts/MainLayout";

const LoanRequestListWaiting = () => {
  return (
    <MainLayout>
      <Datatable 
        code="loanConflictReport" 
        info={loanConflictReport} 
      />
    </MainLayout>
  )
}

export default LoanRequestListWaiting;