import { useRouter } from 'next/router';

import Datatable from "@components/Datatable";
import MainLayout from "@components/layouts/MainLayout";

const App = () => {
  const router = useRouter();
  const code = router.query.code
  if (code === undefined) {
    return <></>;
  }
  
  return (
    <MainLayout>
      <Datatable title={code} code={code} params={router.query} showSummaryBy={code === 'systemAccount' ? 'balance' : null} />
    </MainLayout>
  );
};

export default App;
