import React from 'react'
import Navbar from '../../Component/User/Navbar'
import HomeUser from '../../Component/User/HomeUser'
import Option from '../../Component/User/Option'
import ProductList from '../../Component/User/ProductList'
import Footer from '../../Component/User/Footer'

function Home() {
  return (
   <>
   <Navbar/>
   <HomeUser/>
   <Option />
   <ProductList/>
   <Footer />
   </>
  )
}

export default Home
