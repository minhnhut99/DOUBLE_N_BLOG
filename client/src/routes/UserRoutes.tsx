import NotAccess from '@/pages/not_access/NotAccess'
import React from 'react'
import { Route } from 'react-router-dom'

const UserRoutes = ({ component: Component }: any,isAuth:boolean, ...rest: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) => (isAuth ? <Component {...props} /> : <NotAccess />)}
   />
  )
}

export default UserRoutes