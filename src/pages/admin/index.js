import { Tabs } from "antd";
import { useEffect, useState , text , useContext} from "react";
import Context from '@context/Context';
import MainLayout from "@components/layouts/MainLayout";

const { TabPane } = Tabs;

const Dashboard = () => {
  useEffect(() => {
  }, []);

  return (
    <MainLayout title="Профайл">
        Dashboard
      {/* <Tabs defaultActiveKey="1">
        <TabPane tab="Ерөнхий мэдээлэл" key="1">
          <ProfileInfo data={profileData} />
        </TabPane>
        <TabPane tab="Нууц үг солих" key="2">
          <ChangePassword />
        </TabPane>
      </Tabs> */}
    </MainLayout>
  )
}

export default Dashboard;