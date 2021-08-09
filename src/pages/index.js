import MainLayout from "@components/layouts/MainLayout";
import { useContext, useEffect, useState } from 'react';
import {useNode} from "@craftjs/core";

const Dashboard = () => {
  // const { connectors: {drag} } = useNode();
  useEffect(() => {
    
  }, []);

  return (
    <MainLayout title="Хяналтын самбар" className="main-content-no-back">
      
      Hynaltin sambar
      {/* <div ref={drag}>
        <h2>ANFNASLFNASLNFASLJNFSALK</h2>
      </div> */}
      <a href="/product">product</a>
    </MainLayout>
  );
};

export default Dashboard;