import { useGetListPostQuery } from '@/api/post';
import Bio from '@/components/bio/Bio';
import LoadMore from '@/components/load_more/LoadMore';
import RenderPosts from '@/components/render/render_posts/RenderPosts';
import Title from '@/components/title/Title';
import { Path } from '@/constant/appConstant';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const navigate = useNavigate();
  const getListPost = useGetListPostQuery();
  const handleClickMorePost = () => {
    navigate(Path.posts);
  };
  return (
    <div className="home">
      <div className="home-container">
        <Bio />
        <div className="wrapper-inner">
          <div className="home-inner">
            <div className="header-all-post">
              <Title text="All blog posts" />
            </div>
            <div className="list-post">
              <RenderPosts />
            </div>
            <LoadMore onClick={handleClickMorePost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
