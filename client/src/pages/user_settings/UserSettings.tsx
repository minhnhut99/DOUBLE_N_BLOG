import { Outlet } from 'react-router-dom';
import Sidebar from '@/pages/user_settings/sidebar/Sidebar';
import './UserSettings.scss';
const UserSettings = () => {
  return (
    <div className="user-settings">
      <div className="wrapper-inner">
        <div className="container">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
