import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Global.scss';
const Global = () => {
  return (
    <div className="background">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Global;
