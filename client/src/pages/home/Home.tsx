import { useGetAllListPostQuery, useGetListPostQuery } from '@/api/post';
import Bio from '@/components/bio/Bio';
import LoadMore from '@/components/load_more/LoadMore';
import RenderPosts from '@/components/render/render_posts/RenderPosts';
import Title from '@/components/title/Title';
import { Path } from '@/constant/appConstant';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { formatDate } from '@/utils/utils';
import CardPost from '@/components/card_post/CardPost';
import { ICardPost } from '@/type/post';

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
              {/* {getListPost.data?.map(
                ({
                  u_name,
                  p_desc,
                  p_title,
                  created_at,
                  count_comment,
                  count_like,
                  p_thumbnail,
                  c_name,
                  p_id,
                  p_content,
                }: ICardPost) => (
                  <CardPost
                    key={p_id}
                    u_name={u_name}
                    p_desc={p_desc}
                    p_title={p_title}
                    p_thumbnail={p_thumbnail}
                    created_at={formatDate(created_at, 1)}
                    count_like={count_like}
                    count_comment={count_comment}
                    p_content={p_content}
                    c_name={c_name}
                    p_id={p_id}
                    type="block"
                  />
                )
              )} */}
            </div>
            <LoadMore onClick={handleClickMorePost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
