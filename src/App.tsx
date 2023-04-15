import './App.css'
import Global from '@/pages/global/Global'
import { toggleThemeValue } from './recoil/atoms'
import { useRecoilValue } from "recoil"
import Router from "@/routes/Routes"
function App() {
  const theme = useRecoilValue(toggleThemeValue)
  return (
    <div className={theme ? "dark" : "light"}>
      <Router />
    </div>
  )
}

export default App
