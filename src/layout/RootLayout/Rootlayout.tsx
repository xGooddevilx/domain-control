import { Outlet } from "@tanstack/react-router"
import { ConfigProvider ,Layout} from "antd"
import Header from "./components/Header";


const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
};



const { Content } = Layout

export const Rootlayout = () => {
  return (
    <ConfigProvider>
      <Layout className="flex flex-col h-screen">
        <Header />
        <Content style={contentStyle}>
          <Outlet/>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}
