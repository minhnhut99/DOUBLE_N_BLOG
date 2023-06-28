import { useGetDetailPost } from '@/api/post';
import SeparatorLine from '@/components/separator_line/SeparatorLine';
import { colorCategory, formatDate } from '@/utils/utils';
import { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './DetailPost.scss';

const DetailPost = () => {
  const { postId, category } = useParams();
  console.log('category', category);
  const contentRef = useRef<any>(null);
  const { data: postData } = useGetDetailPost(postId);
  let colorCate = '';
  if (postData) {
    colorCate = colorCategory(postData.c_name);
  }
  const renderContent = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = postData?.p_content;
    }
  }, [contentRef, postData]);

  useEffect(() => {
    renderContent();
  }, [renderContent, postData]);

  return (
    <div className="detail-page">
      <div className="wrapper-inner">
        <div className="detail-container">
          <div className="detail-container-left">
            <header className="detail-header">
              <div className="header-info">
                <h4>
                  Created by: <span>{postData?.u_name}</span>
                </h4>
              </div>
              <h1 className="header-title">{postData?.p_title}</h1>
              <div className="header-date">
                <div className="date">
                  {formatDate(postData?.created_at, 2)}
                </div>
                <div className="header-breadcrumb">
                  <span className={colorCate}>{postData?.c_name}</span>
                </div>
              </div>
            </header>
            <SeparatorLine />
            <div
              id="detail-content"
              className="detail-content"
              ref={contentRef}
            ></div>
          </div>
          <div className="detail-container-right">
            <div className="info-author">
              <img
                src="https://images.unsplash.com/photo-1686781483909-a5fb625ca043?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=400&q=60"
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
