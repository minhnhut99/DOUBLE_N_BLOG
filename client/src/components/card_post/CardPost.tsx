import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/icon/Icon';
import { ICardPost } from '@/type/post';
import { LIKE_ICON, COMMENT_ICON } from '@/assets/icons/Icons';
import { Path } from '@/constant/appConstant';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './CardPost.scss';
import { colorCategory } from '@/utils/utils';
import Skeleton from '@/components/skeleton/Skeleton';

const CardPost = ({
  type = 'block',
  c_name,
  count_like,
  count_comment,
  p_desc,
  p_title,
  u_name,
  created_at,
  p_thumbnail,
  p_id,
}: ICardPost) => {
  const navigate = useNavigate();
  const { ref: cardRef, inView: elementVisible } = useInView();
  const [showSkeleton, setShowSkeleton] = useState(false);
  useEffect(() => {
    colorCategory(c_name);
  }, [c_name]);
  useEffect(() => {
    setShowSkeleton(elementVisible);
  }, [elementVisible]);

  const handleClickCard = () => {
    navigate(`${Path.detail}/category/${c_name}/${p_id}`);
  };
  return (
    <div className="card" onClick={handleClickCard} ref={cardRef}>
      {showSkeleton ? (
        <div
          className={type === 'block' ? 'card-container' : 'card-container-row'}
        >
          <img src={p_thumbnail} alt="img thumbnail" />
          <div className="card-right">
            <div className="card-header-info">
              <p className={`card-category ${colorCategory(c_name)}`}>
                {c_name}
              </p>
              <div className="like-cmt-group">
                <div className="icon-like">
                  <Icon icon={LIKE_ICON} />
                  <small className="total-like">
                    {count_like >= 100 ? '99+' : count_like}
                  </small>
                </div>
                <div className="icon-cmt">
                  <Icon icon={COMMENT_ICON} />
                  <small className="total-cmt">
                    {count_comment >= 100 ? '99+' : count_comment}
                  </small>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="card-author-date">
                <p className="card-author text">{u_name}</p>
                <p className="card-date">{created_at}</p>
              </div>
            </div>
            <h3 className="card-title text" title={p_title}>
              {p_title}
            </h3>
            <p className="card-desc text">{p_desc}</p>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default CardPost;
