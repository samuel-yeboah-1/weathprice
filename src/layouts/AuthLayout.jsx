import React from 'react'
import { Outlet } from 'react-router'

function AuthLayout() {
  return (
     <div className=" py-12 flex flex-col gap-10  items-center justify-center overf">
      <p>Hello and Welcome to WeathPrice</p>
      <Outlet />
    </div>
  )
}

export default AuthLayout