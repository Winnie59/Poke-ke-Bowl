import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Socialbar from './Socialbar'


const Layout = ({children}) => {
  return (
    <div>
        <Socialbar />
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}

export default Layout