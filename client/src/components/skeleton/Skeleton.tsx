import React from 'react';
import Icon from '@/components/icon/Icon';
import { SKELETON_IMAGE_ICON } from '@/assets/icons/Icons';
import './Skeleton.scss';

const Skeleton = () => {
  return (
    <div className="wrapper-inner">
      <div className="skeleton-item">
        <div className="skeleton item-top">
          <div className="img-avt">
            <Icon icon={SKELETON_IMAGE_ICON} />
          </div>
        </div>
        <div className="item-bottom">
          <div className="bottom-left">
            <div className="skeleton category"></div>
            <div className="skeleton author"></div>
            <div className="skeleton title"></div>
            <div className="skeleton desc"></div>
          </div>
          <div className="bottom-right">
            <div className="top">
              <div className="skeleton right-left"></div>
              <div className="skeleton right-right"></div>
            </div>
            <div className="skeleton bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
