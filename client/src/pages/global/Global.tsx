import React from 'react'
import "./Global.scss"
import Header from '@/components/header/Header'
import Bio from '@/components/bio/Bio'
import CardPost from '@/components/card_post/CardPost'
const Global = () => {
  return (
    <div className='background'>
      <Header />
      <div>
        <Bio />
      </div>
      <div className='list-post' style={{ display: 'flex', alignItems: "center", width: "80%", margin: '0 auto' }}>
        {/* listing card */}
        <CardPost total_like={199} total_cmt={10} category_name='technology' type='block' />
        <CardPost total_like={10} total_cmt={1000} category_name='life' type='block' />
        <CardPost total_like={10} total_cmt={1000} category_name='music' type='block' />
      </div>
      <CardPost total_like={10} total_cmt={1000} category_name='story' type='row' />
    </div>
  )
}

export default Global