import './App.css';
import { toggleThemeValue } from './recoil/atoms';
import { useRecoilValue } from 'recoil';
import Router from '@/routes/Routes';
import NotiToast from './components/noti_toast/NotiToast';
import ScrollToTop from 'react-scroll-to-top';
import { BACK_TO_TOP } from './assets/icons/Icons';
function App() {
  const theme = useRecoilValue(toggleThemeValue);
  return (
    <div className={theme ? 'dark' : 'light'}>
      <Router />
      <NotiToast />
      <ScrollToTop
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#cbeeee',
          width: '35px',
        }}
        component={BACK_TO_TOP}
        smooth
      />
    </div>
  );
}

export default App;
