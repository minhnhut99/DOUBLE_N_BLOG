import React from 'react';
import Icon from '@/components/icon/Icon';
import { SKELETON_IMAGE_ICON } from '@/assets/icons/Icons';
import './Skeleton.scss';
interface ISkeleton {
  count: number;
}
const Skeleton = ({ count }: ISkeleton) => {
  const listItem = [];
  for (let i = 0; i <= 7; i++) {
    listItem.push(
      <div className="skeleton-item" key={i}>
        <div className="item-top">
          <div className="img-avt">
            <Icon icon={SKELETON_IMAGE_ICON} />
          </div>
        </div>
        <div className="item-bottom">
          <div className="bottom-left"></div>
          <div className="bottom-right">
            <div className="top">
              <div className="right-left"></div>
              <div className="right-right"></div>
            </div>
            <div className="bottom"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="skeleton">
      <div className="wrapper-inner">
        <div className="container">{listItem}</div>
      </div>
    </div>
  );
};

export default Skeleton;
