import React from 'react'
import NavBar from '../../components/navbar'
const layout = ({children}) => {
  return (
    <div>
            <NavBar  />
        {children}
        </div>
  )
}

export default layout