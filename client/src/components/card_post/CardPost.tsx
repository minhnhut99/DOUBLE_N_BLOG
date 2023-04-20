import React from 'react'
import Icon from '@/components/icon/Icon'
import { LIKE_ICON, COMMENT_ICON } from '@/assets/icons/Icons'
import "./CardPost.scss"

interface ICardProps {
  type: string
  category_name: string
  total_like: number
  total_cmt: number
}
const CardPost = ({ type = 'block', category_name, total_like, total_cmt, }: ICardProps) => {
  const colorCategory = (category_name: string) => {
    const categoryColorMap: Record<string, string> = {
      'technology': 'color-technology',
      'life': 'color-life',
      'music': 'color-music'
    };
    return categoryColorMap[category_name] || 'color-story';
  };
  return (
    <div className='card'>
      <div className={type === "block" ? "card-container" : "card-container-row"}>
        <img src="https://mria-hugo.netlify.app/images/11.jpg" alt="img logo" />
        <div className='card-right'>
          <div className='card-header-info'>
            <p className={`card-category ${colorCategory(category_name)}`}>{category_name}</p>
            <div className="like-cmt-group">
              <div className='icon-like'>
                <Icon icon={LIKE_ICON} />
                <small className='total-like'>{
                  total_like >= 100 ? "99+" : total_like
                }</small>
              </div>
              <div className='icon-cmt'>
                <Icon icon={COMMENT_ICON} />
                <small className='total-cmt'>
                  {
                    total_cmt >= 100 ? "99+" : total_cmt
                  }
                </small>
              </div>
            </div>
          </div>
          <div className='card-footer'>
            <div className='card-author-date'>
              <p className='card-author text'>Nolan Bergson</p>
              <p className='card-date'>29 May 2020</p>
            </div>
          </div>
          <h3 className='card-title text'>In order to write about life first you must live it</h3>
          <div className='card-desc text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia magnam ex amet inventore sunt recusandae facilis atque eaque non, sed unde dignissimos dolore deserunt culpa in nulla quisquam vero maiores?</div>
        </div>
      </div>
    </div>
  )
}

export default CardPost