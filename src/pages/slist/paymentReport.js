import paymentReport from '@constants/listinfo/paymentReport';
import Datatable from '@components/Datatable';
import MainLayout from "@components/layouts/MainLayout";

const LoanRequestListWaiting = () => {
  return (
    <MainLayout>
      <Datatable 
        code="paymentReport" 
        info={paymentReport} 
      />
    </MainLayout>
  )
}

export default LoanRequestListWaiting;