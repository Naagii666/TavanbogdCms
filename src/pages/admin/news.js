import { Tabs } from "antd";
import { useEffect, useState } from "react";

import MainLayout from "@components/layouts/MainLayout";

const { TabPane } = Tabs;

const News = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
  }, []);

  return (
    <MainLayout title="Профайл">
        News
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

export default News;