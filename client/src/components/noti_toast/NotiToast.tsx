import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotiToast = () => {
  return (
    <ToastContainer 
      position='top-right'
      autoClose={200}
      hideProgressBar={false}
      closeOnClick
      rtl={false}
      theme='dark'
    />
  );
}

export default NotiToast