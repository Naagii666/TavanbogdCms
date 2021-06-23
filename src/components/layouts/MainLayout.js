import { useContext, useState } from 'react';
import LoadingBar from 'react-top-loading-bar'
import { Layout, Spin } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';
import Context from '@context/Context';
import { LoadingOutlined } from '@ant-design/icons';

const { Content, Footer } = Layout;

const MainLayout = ({ children, title, className }) => {
  const { isLoading, setIsLoading } = useContext(Context);
  const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

  return (
    <Spin indicator={antIcon} tip="Таны хүсэлтийг боловсруулж байна. Түр хүлээнэ үү..." spinning={isLoading}>
      <Layout>
        <LoadingBar color='#109720' progress={isLoading ? 70 : 100} />
        <Sidebar />
        <Layout>
          <Header />
          <Content className={className !== undefined ? className : "main-content"}>
            {title && <h1 className="main-title">{title}</h1>}
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
          </Footer>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default MainLayout;
