import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import { AuthProvider } from '../providers/AuthProvider'
import { CommonLayout } from '../layouts/common/CommonLayout'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { store } from "../store/index"
import '../styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CommonLayout sider={<Sidebar />}>
          <Component {...pageProps} />
        </CommonLayout>
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
