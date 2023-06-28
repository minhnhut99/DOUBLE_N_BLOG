import moment from 'moment';
import { useGetListPostQuery } from '@/api/post';
import CardPost from '@/components/card_post/CardPost';
import { ICardPost } from '@/type/post';
import { formatDate } from '@/utils/utils';
import Skeleton from '@/components/skeleton/Skeleton';

const RenderPosts = () => {
  const getListPost = useGetListPostQuery();
  return (
    <>
      {getListPost.data?.map(
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
      )}
    </>
  );
};

export default RenderPosts;
