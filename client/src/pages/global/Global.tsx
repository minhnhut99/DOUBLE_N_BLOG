import { Outlet } from 'react-router-dom';
import Bio from '@/components/bio/Bio';
import CardPost from '@/components/card_post/CardPost';
import Header from '@/components/header/Header';
import './Global.scss';
import Footer from '@/components/footer/Footer';
const Global = () => {
  return (
    <div className="background">
      <Header />
      {/* <div
        className="list-post"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '80%',
          margin: '0 auto',
        }}
      >
        <CardPost
          total_like={199}
          total_cmt={10}
          category_name="technology"
          type="block"
        />
        <CardPost
          total_like={10}
          total_cmt={1000}
          category_name="life"
          type="block"
        />
      </div> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Global;
