import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import Auth from "@utils/auth";
import { Layout, Dropdown, Menu } from "antd";
import Link from "next/link";
import { NotificationOutlined } from "@ant-design/icons";
const { Header } = Layout;
import { sList } from "@api/api";
const Nav = () => {
  const code = "notification";
  const router = useRouter();
  const token = Auth.getToken() || null;
  let user = {};
  if (token) {
    user = jwt_decode(token);
  }

  const logOut = () => {
    Auth.destroyToken();
    router.push("/login");
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Link href="/profile">Профайл</Link>
      </Menu.Item>
      <Menu.Item onClick={logOut}>Гарах</Menu.Item>
    </Menu>
  );
  return (
    <Header className="main-header">
      <div
        style={{
          float: "right",
          paddingBottom: "5px",
          marginRight: "1.6rem",
        }}
      >
        <NotificationOutlined
          style={{ marginRight: "10px" }}
          onClick={()=>{
            router.push("/notification");
          }}
        />
        <Dropdown
          placement="bottomRight"
          arrow
          trigger={["click"]}
          overlay={overlay}
        >
          <span
            style={{
              marginLeft: "5px",
              marginRight: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #109720",
            }}
          >
            {user.user_name.toUpperCase()}
          </span>
        </Dropdown>
      </div>
    </Header>
  );
};

export default Nav;
