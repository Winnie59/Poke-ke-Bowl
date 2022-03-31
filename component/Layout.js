import React, { useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import SideBar from './SideBar'
import Socialbar from './Socialbar'


const Layout = ({children}) => {
  const [sideOpen, setSideOpen] = useState(false)
  return (
    <div>
        <Socialbar />
        <Navbar sideOpen={sideOpen} setSideOpen={setSideOpen} />
        <SideBar sideOpen={sideOpen} setSideOpen={setSideOpen}/>
        {children}
        <Footer />
    </div>
  )
}

export default Layout