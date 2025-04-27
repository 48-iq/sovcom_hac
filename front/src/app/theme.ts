import { ThemeConfig } from "antd";

export const theme: ThemeConfig  = {
  components: {
    Input: {
      colorTextPlaceholder: 'white'
    }, 
    Button: {
      colorPrimary: '#003791',
    },
    Layout: {
      headerBg: 'white',
      bodyBg: 'white',
      footerBg: 'white'
    },
    Select: {
      selectorBg: '#003791',
      colorBorder: '#003791',
      colorText: 'white',
    },
  }
}