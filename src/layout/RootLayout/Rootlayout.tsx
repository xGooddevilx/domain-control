import { Outlet } from "@tanstack/react-router"
import { ConfigProvider ,Layout} from "antd"
import Header from "./components/Header";



const { Content } = Layout

export const Rootlayout = () => {
  return (
    <ConfigProvider>
      <Layout className="flex flex-col h-screen">
        <Header />
        <Content className="px-2 container mx-auto">
          <Outlet/>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}
