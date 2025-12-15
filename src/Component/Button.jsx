import React from 'react'

function Button({children,type='button',bgcolor='bg-blue-600',textcolor='text-white',className='',...props}) {
  return (
   <button type={type} className={`px-3 py-1 rounded-lg  ${bgcolor} ${textcolor} ${className} `} {...props} >{children}</button>
  )
}

export default Button
