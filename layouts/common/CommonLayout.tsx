import { FC, ReactElement } from 'react'
import { Breadcrumb, Layout } from 'antd';
import { Header } from '../../components/Header/Header'

type CommonLayoutProps = {
  children: ReactElement
  sider?: ReactElement
}

export const CommonLayout: FC<CommonLayoutProps> = ({ children, sider }) => {
  const { Content, Footer } = Layout


  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          {sider}
          <Content style={{ padding: '0 24px' }}>
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>BooXchange ©2022</Footer>
    </Layout>
  )
}
