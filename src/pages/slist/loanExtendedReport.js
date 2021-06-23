import loanExtendedReport from '@constants/listinfo/loanExtendedReport';
import Datatable from '@components/Datatable';
import MainLayout from "@components/layouts/MainLayout";

const LoanRequestListWaiting = () => {
  return (
    <MainLayout>
      <Datatable 
        code="loanExtendedReport" 
        info={loanExtendedReport} 
      />
    </MainLayout>
  )
}

export default LoanRequestListWaiting;