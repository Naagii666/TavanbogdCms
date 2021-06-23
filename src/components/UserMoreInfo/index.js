import { Tabs } from "antd";
import { useState, useEffect, useContext } from "react";
import Context from "@context/Context";
import { sList } from "@api/api";
import UserGeneralInfo from "@components/UserMoreInfo/General";
import FinanceInfo from "@components/UserMoreInfo/Finance";
import EmploymentInfo from "@components/UserMoreInfo/Employment";
import Address from "@components/UserMoreInfo/Address";
import OtherInfo from "@components/UserMoreInfo/Other";

const { TabPane } = Tabs;

const ProfileInfo = ({ filter }) => {
  const ctx = useContext(Context);
  const [data, setData] = useState();

  useEffect(() => {
    if (filter !== undefined) {
      (async () => {
        ctx.setIsLoading(true);
        const res = await sList({
          code: "userDetailedInfo",
          filter: {
            id: {
              filter: filter,
              filterType: "number",
              type: "equals",
            },
          },
        });
        setData(res.data[0]);
        ctx.setIsLoading(false);
      })();
    }
  }, [filter]);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Ерөнхий" key="1">
        <UserGeneralInfo data={data} />
      </TabPane>
      <TabPane tab="Санхүү" key="2">
        <FinanceInfo data={data} />
      </TabPane>
      <TabPane tab="Ажил эрхлэлт" key="3">
        <EmploymentInfo data={data} />
      </TabPane>
      <TabPane tab="Хаяг" key="4">
        <Address data={data} />
      </TabPane>
      <TabPane tab="Бусад" key="5">
        <OtherInfo data={data} />
      </TabPane>
    </Tabs>
  );
};

export default ProfileInfo;
