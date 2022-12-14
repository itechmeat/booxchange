import { FC, createElement } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'

type SidebarProps = {}

export const Sidebar: FC<SidebarProps> = () => {
  const { Sider } = Layout

  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1)
  
      return {
        key: `sub${key}`,
        icon: createElement(icon),
        label: `subnav ${key}`,
  
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1
          return {
            key: subKey,
            label: `option${subKey}`,
          }
        }),
      }
    },
  )

  return (
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
        items={items2}
      />
    </Sider>
  )
}
