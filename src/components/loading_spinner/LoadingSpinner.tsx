import React from 'react'
import "./LoadingSpinner.scss"
const LoadingSpinner = () => {
  return (
    <div className="lds-ellipsis">
      <div className='lds-inner'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default LoadingSpinner