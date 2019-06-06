import React from 'react'
import Sidebar from '../../components/sidebar';
import Phones from "../phones";

const Layout = () => {
  return (
    <div className='view-container'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-9'>
            <Phones />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
