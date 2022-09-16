import { FC } from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu, Spin } from 'antd'
import { useAppSelector } from '../../store/hooks'
import styles from './Header.module.scss'

type HeaderProps = {}

export const Header: FC<HeaderProps> = () => {
  const { Header } = Layout
  const userStore = useAppSelector((state) => state.user)  

  const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
    key,
    label: `nav ${key}`,
  }))

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>BooXchange</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      <div className={styles.user}>
        {!userStore.isUserLoaded ? <Spin /> : <span>{userStore.user?.email}</span>}
      </div>
    </Header>
  )
}
