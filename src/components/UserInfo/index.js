import { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Grid, Row, Col, Divider, Checkbox } from "antd";
import css from "./_.module.css";
import { sList } from "@api/api";
import Context from "@context/Context";
import MainModal from "@components/MainModal";
import UserMoreInfo from "@components/UserMoreInfo";
import Datatable from "@components/Datatable";

const ProfileInfo = ({ filter }) => {
  const ctx = useContext(Context);
  const [showMore, setShowMore] = useState(false);
  const [showBankAccount, setShowBankAccount] = useState(false);
  const [showLoanInfo, setShowLoanInfo] = useState(false);
  const [showUserLog, setShowUserLog] = useState(false);
  const [data, setData] = useState({});

  const [checkboxOptions, setCheckboxOptions] = useState([
    "Гар утас",
    "Анкет",
    "Банкны данс",
    "Монгол банк",
    "Гарын үсэг",
  ]);
  const [checked, setChecked] = useState([]);

  const screens = Grid.useBreakpoint();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 24,
    },
  };

  // useEffect(() => console.log(filter));

  useEffect(() => {
    if (filter !== undefined) {
      (async () => {
        ctx.setIsLoading(true);
        const res = await sList({
          code: "userGeneralInfo",
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

  useEffect(() => {
    let tmpArray = [];
    data.ispassedmobile && tmpArray.push("Гар утас");
    data.ispassedanket && tmpArray.push("Анкет");
    data.ispassedbank && tmpArray.push("Банкны данс");
    data.ispassedbom && tmpArray.push("Монгол банк");
    data.ispassedagreement && tmpArray.push("Гарын үсэг");
    setChecked(tmpArray);
  }, [data]);

  const handleCheckboxChange = (values) => {
    setChecked(values);
  };
  return (
    <>
      <Row>
        <Col span={screens.xl ? 12 : 24}>
          {data && (
            <Form {...layout}>
              <Form.Item label="Овог">
                <Input value={data.lastname} />
              </Form.Item>
              <Form.Item label="Нэр">
                <Input value={data.firstname} />
              </Form.Item>
              <Form.Item label="И-мэйл">
                <Input value={data.email} />
              </Form.Item>
              <Form.Item label="Утас">
                <Input value={data.mobilenumber} />
              </Form.Item>
              <Form.Item label="Wallet-н үлдэгдэл">
                <Input value={data.walletamt} />
              </Form.Item>
              {data.filepath && (
                <Form.Item label="Лавлагаа">
                  <Button>Татах</Button>
                </Form.Item>
              )}
              {data.filepath2 && (
                <Form.Item label="Лавлагаа 2">
                  <Button>Татах</Button>
                </Form.Item>
              )}
              <Form.Item label="Score">
                <Input value={`${data.loanscore} (${data.scoredate})`} />
              </Form.Item>
              <Form.Item
                {...tailLayout}
                name="checkbox"
                valuePropName="checked"
              >
                <Checkbox.Group
                  options={checkboxOptions}
                  value={checked}
                  onChange={handleCheckboxChange}
                />
              </Form.Item>
              <Divider orientation="left" />
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  onClick={() => {
                    setShowMore(true);
                  }}
                >
                  Дэлгэрэнгүй
                </Button>
                <Button
                  className={css.leftBtn}
                  onClick={() => {
                    setShowLoanInfo(true);
                  }}
                >
                  Зээлийн мэдээллийн сан
                </Button>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  onClick={() => {
                    setShowBankAccount(true);
                  }}
                >
                  Банкны данс
                </Button>
                <Button
                  className={css.leftBtn}
                  onClick={() => {
                    setShowUserLog(true);
                  }}
                >
                  Хэрэглэгчийн түүх харах
                </Button>
              </Form.Item>
              {/* <Divider orientation="left" /> */}
              <Form.Item {...tailLayout}>
                <Button type="primary" className="warning-btn">
                  Нэвтрэх нэр солих
                </Button>
                <Button type="primary" className={css.leftBtn} danger>
                  Устгах
                </Button>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" className="warning-btn">
                  Хэтэвчнээс таталт хийх
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>

      <MainModal
        title="Дэлгэрэнгүй мэдээлэл"
        visible={showMore}
        onCancel={() => setShowMore(false)}
        footer={null}
      >
        <UserMoreInfo filter={filter} />
      </MainModal>
      <MainModal
        title="Зээлийн мэдээллийн сан"
        visible={showLoanInfo}
        width={"80%"}
        onCancel={() => setShowLoanInfo(false)}
        footer={null}
      >
        <Datatable
          title={"userCbi"}
          code={"userCbi"}
          showTitle={false}
          params={{ user_id: filter }}
          doesFilter={false}
        />
      </MainModal>
      <MainModal
        title="Банкны данс"
        visible={showBankAccount}
        width={"80%"}
        onCancel={() => setShowBankAccount(false)}
        footer={null}
      >
        <Datatable
          title={"userBankAcc"}
          code={"userBankAcc"}
          showTitle={false}
          params={{ user_id: filter }}
          doesFilter={false}
        />
      </MainModal>
      <MainModal
        title="Хэрэглэгчийн түүх харах"
        visible={showUserLog}
        width={"80%"}
        onCancel={() => setShowUserLog(false)}
        footer={null}
      >
        <Datatable title={"news"} code={"news"} showTitle={false} />
      </MainModal>
    </>
  );
};

export default ProfileInfo;
