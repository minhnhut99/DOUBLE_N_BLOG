import React from 'react'
import "./Mansory.scss"
const Mansory = () => {

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 6) + 2;
  }
  return (
    <div className="masonry-layout">
      <div className="masonry-item">Item 1</div>
      <div className="masonry-item">Item 2</div>
      <div className="masonry-item">Item 3</div>
      <div className="masonry-item">Item 3</div>
      <div className="masonry-item">Item 3</div>
      <div className="masonry-item">Item 3</div>
      <div className="masonry-item">Item 3</div>
      <div className="masonry-item">Item 3</div>
    </div>
  )
}

export default Mansory