import { Tabs } from "antd";

import MainLayout from "@components/layouts/MainLayout";
import ProfileInfo from "@components/ProfileInfo";
import ChangePassword from "@components/ChangePassword";
import { useEffect, useState } from "react";
import { apiList, sList } from "@api/api";

const { TabPane } = Tabs;

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      const data = await sList({ code: apiList.adminProfile });
      setProfileData(data?.data[0]);
    };

    getProfile();
  }, []);

  return (
    <MainLayout title="Профайл">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Ерөнхий мэдээлэл" key="1">
          <ProfileInfo data={profileData} />
        </TabPane>
        <TabPane tab="Нууц үг солих" key="2">
          <ChangePassword />
        </TabPane>
      </Tabs>
    </MainLayout>
  )
}

export default Profile;