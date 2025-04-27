import { ConfigProvider as AntdConfigProvider } from "antd"
import { RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider} from 'react-redux'
import ruRU from "antd/es/locale/ru_RU"
import { store } from "./store"
import { router } from './router'
import { theme } from "./theme"
import 'antd/dist/reset.css'

export const App = () => {
  return (
    <AntdConfigProvider
      locale={ruRU}
      componentSize={"large"}
      getPopupContainer={(trigger: any) => trigger?.parentElement}
      theme={theme}
    >
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </AntdConfigProvider>
  )
}
