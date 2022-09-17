import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { MenuProps } from 'antd'
import { Layout, Menu, Spin, Button } from 'antd'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logoutAsync } from '../../store/slices/user'
import styles from './Header.module.scss'

type HeaderProps = {}

export const Header: FC<HeaderProps> = () => {
  const router = useRouter()
  const { Header } = Layout
  const dispatch = useAppDispatch()
  const { user, profile, isProfileLoaded, isLoading } = useAppSelector((state) => state.user)  

  const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
    key,
    label: `nav ${key}`,
  }))

  const logout = async () => {
    await dispatch(logoutAsync())
    router.push('/auth/signin')
  }

  return (
    <Header className={styles.header}>
      <Link href='/'><a className={styles.logo}>BooXchange</a></Link>
      <Menu theme='dark' mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      <div className={styles.user}>
        {isLoading && !isProfileLoaded ? <Spin /> : <div>
          {profile ? <>
            <Link href={`/profile/${user?.id}`}>{user?.email}</Link>
            <span> </span>
            <Button size='small' type='primary' onClick={logout}>Logout</Button>
          </> : <Link href={'/auth/signin'}>Login</Link>}
        </div>}
      </div>
    </Header>
  )
}
