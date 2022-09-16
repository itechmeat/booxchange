import type { AppProps } from 'next/app'
import { CommonLayout } from '../layouts/common/CommonLayout'
import { Sidebar } from '../components/Sidebar/Sidebar'
import 'antd/dist/antd.css'
import '../styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CommonLayout sider={<Sidebar />}>
      <Component {...pageProps} />
    </CommonLayout>
  )
}

export default MyApp
