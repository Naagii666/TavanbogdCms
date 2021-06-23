import { useRouter } from 'next/router';
import { Tabs } from "antd";

import MainLayout from "@components/layouts/MainLayout";
import UserInfo from "@components/UserInfo";
import UserMoreInfo from "@components/UserMoreInfo";
import { useState, useContext, useLayoutEffect } from "react";
import Datatable from "@components/Datatable";
import LoanCredit from "@components/LoanPermission";
import Context from "@context/Context";

const { TabPane } = Tabs;

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const ctx = useContext(Context);
  const router = useRouter();

  const userid = router.query.code;

  return (
    <MainLayout title="Харилцагчийн мэдээлэл">
      <Tabs defaultActiveKey="1">
        {
          ctx.checkPermission("SHOW_GENERAL_INFO") && (
            <TabPane tab="Ерөнхий мэдээлэл" key="1">
              <UserInfo data={profileData} filter={userid} />
            </TabPane>
          )
        }
        {
          ctx.checkPermission("LOAN_PERMISSION_SHOW") && (
            <TabPane tab="Зээлийн эрх" key="3">
              <LoanCredit filter={userid} />
            </TabPane>
          )
        }
        {
          ctx.checkPermission("LOAN_LIST_SHOW") && (
            <TabPane tab="Авсан зээл" key="4">
              <Datatable 
                title={"userLoan"} 
                code={"userLoan"} 
                showTitle={false} 
                params={{user_id: userid}}  
                doesFilter={false} 
              />
            </TabPane>
          )
        }
        {
          ctx.checkPermission("LEND_LIST_SHOW") && (
            <TabPane tab="Өгсөн зээл" key="5">
              <Datatable 
                title={"userLoanSaving"} 
                code={"userLoanSaving"} 
                showTitle={false}
                params={{user_id: userid}}
                doesFilter={false} 
              />
            </TabPane>
          )
        }
        {
          ctx.checkPermission("LOAN_REQUEST_SHOW") && (
            <TabPane tab="Зээл авах хүсэлт" key="6">
                <Datatable 
                  title={"userLoanRequest"} 
                  code={"userLoanRequest"} 
                  showTitle={false} 
                  params={{user_id: userid}}
                  doesFilter={false}
                />
            </TabPane>
          )
        }
        {
          ctx.checkPermission("LEND_REQUEST_SHOW") && (
            <TabPane tab="Зээл өгөх хүсэлт" key="7">
                <Datatable 
                  title={"userLendRequest"} 
                  code={"userLendRequest"} 
                  showTitle={false} 
                  params={{user_id: userid}}
                  doesFilter={false}
                />
            </TabPane>
          )
        }
        {
          ctx.checkPermission("TRANSACTION_LOG_SHOW") && (
            <TabPane tab="Гүйлгээний түүх" key="8">
              <Datatable 
                title={"userBook"} 
                code={"userBook"} 
                showTitle={false}
                params={{user_id: userid}}
                doesFilter={false} 
              />
            </TabPane>
          )
        }
        {
          ctx.checkPermission("NOTIFICATION_SHOW") && (
            <TabPane tab="Мэдэгдлүүд" key="9">
              <Datatable 
                title={"userNotification"} 
                code={"userNotification"} 
                showTitle={false}
                params={{user_id: userid}}
                doesFilter={false} 
              />
            </TabPane>
          )
        }
        {
          ctx.checkPermission("NOTE_SHOW") && (
              <TabPane tab="Тэмдэглэл" key="10">
              <Datatable 
                title={"userNote"} 
                code={"userNote"} 
                showTitle={false}
                params={{user_id: userid}}
                doesFilter={false}
              />
            </TabPane>
          )  
        }
        
      </Tabs>
    </MainLayout>
  )
}

export default Profile;