import React from 'react'
import './Example.scss'
import { useState } from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from 'react-router-dom'
import Modal from '../modal/Modal'
const Example = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClickBtnOpenModal = () => {
    setIsOpen(!isOpen)
  }
  // const getFetch = async () => {
  //   const rs = await axios.get("https://dummyjson.com/products?limit=10&skip=10&select=title,price")
  //   return rs.data
  // }
  // const { data, isLoading } = useQuery({
  //   queryKey: ["fetchData"],
  //   queryFn: () => getFetch()
  // }
  // )
  // console.log('isLoadng', isLoading)
  // console.log('dataMaster', data.products)
  return (
    <>
      <button onClick={handleClickBtnOpenModal}>click</button>
      <Modal setIsOpen={setIsOpen} children={<div>Modal</div>} isOpen={isOpen} />
      <div>
        123
      </div>
    </>
  )
}

export default Example