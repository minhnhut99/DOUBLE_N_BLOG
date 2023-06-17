import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import Icon from '@/components/icon/Icon';
import Banner1 from '@/assets/images/banner/tech1.avif';
import Banner2 from '@/assets/images/banner/tech2.avif';
import Banner3 from '@/assets/images/banner/tech3.jpg';
import 'swiper/css';
import './Bio.scss';
const Bio = () => {
  const imgs = [Banner1, Banner2, Banner3];
  return (
    <div className="bio">
      <Swiper
        cssMode={true}
        pagination={true}
        mousewheel={true}
        slidesPerView={1}
        spaceBetween={15}
        keyboard={true}
        autoplay={{
          delay: 4000,
        }}
        loop
        speed={200}
        modules={[Autoplay, Navigation, Pagination]}
      >
        {imgs.map((item, idx) => (
          <SwiperSlide key={idx}>
            <img src={item} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="bio-container">
        <h1 className="bio-heading">
          Great things take a long time to accomplish.
        </h1>
        <p className="bio-text">
          &rarr; A simple blog give you a little happiness.
        </p>
      </div>
    </div>
  );
};

export default Bio;
