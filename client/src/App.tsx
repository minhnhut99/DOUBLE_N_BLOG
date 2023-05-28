import './App.css'
import Global from '@/pages/global/Global'
import { toggleThemeValue } from './recoil/atoms'
import { useRecoilValue } from "recoil"
import Router from "@/routes/Routes"
import NotiToast from './components/noti_toast/NotiToast'
function App() {
  const theme = useRecoilValue(toggleThemeValue)
  return (
    <div className={theme ? "dark" : "light"}>
      <Router />
      <NotiToast />
    </div>
  )
}

export default App
