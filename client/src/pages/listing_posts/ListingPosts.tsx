import React from 'react';
import './ListingPosts.scss';
import Title from '@/components/title/Title';
import RenderPosts from '@/components/render/render_posts/RenderPosts';
const ListingPosts = () => {
  return (
    <div className="listing-posts">
      <div className="wrapper-inner">
        <div className="listing-container">
          <Title text="All posts" />
          <div className="list-post">
            <RenderPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPosts;
