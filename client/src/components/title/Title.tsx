import React from 'react'
import "./Title.scss"
interface IText {
  text: string
}
const Title = ({ text }: IText) => {
  return (
    <div className='title'>
      <h1>{text}</h1>
    </div>
  )
}

export default Title