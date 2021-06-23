import userReport from '@constants/listinfo/userReport';
import Datatable from '@components/Datatable';
import MainLayout from "@components/layouts/MainLayout";

const LoanRequestListWaiting = () => {
  return (
    <MainLayout>
      <Datatable 
        code="userReport" 
        info={userReport} 
      />
    </MainLayout>
  )
}

export default LoanRequestListWaiting;