import React from 'react'

import logoIcon from '../static/icon/logo.svg'

const MainLogo = () => {
  return (
    <div className="flex justify-center items-center">
        <img className="max-w-[250px] w-[70%] mt-[30px]" src={logoIcon} alt="Main Logo" />
    </div>
  )
}

export default MainLogo;