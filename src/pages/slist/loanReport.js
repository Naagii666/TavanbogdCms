import loanReport from '@constants/listinfo/loanReport';
import Datatable from '@components/Datatable';
import MainLayout from "@components/layouts/MainLayout";

const LoanRequestListWaiting = () => {
  return (
    <MainLayout>
      <Datatable 
        code="loanReport" 
        info={loanReport} 
      />
    </MainLayout>
  )
}

export default LoanRequestListWaiting;