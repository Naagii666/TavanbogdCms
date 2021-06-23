import MainLayout from "@components/layouts/MainLayout";
import dynamic from "next/dynamic";

const WebSocket = dynamic(() => import("@components/Socket"), {ssr: false});

const SocketPage = () => {
  return (
    <MainLayout>
      <h1>Socket</h1>
      <WebSocket />  
    </MainLayout>
  )
}

export default SocketPage;