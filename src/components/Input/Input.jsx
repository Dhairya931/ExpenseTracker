import React from 'react'

function Input({type,state,placeholder,setState}) {
  return (
    <div>
      <input
      type={type}
      value={state}
      placeholder={placeholder}
      onChange={(e)=>setState(e.target.value)}
       className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      />
    </div>
  )
}

export default Input
