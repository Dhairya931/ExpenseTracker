import React from 'react'
import transactions from '../assets/transactions.svg'
function NoTransactions() {
  return (
    <div className='flex justify-center items-center w-full flex-col mb-8'>
      <img src={transactions} alt="no transaction" className='w-[400px] m-16'/>
      <p className='text-3xl font-bold text-center'>No transactions yet</p>
    </div>
  )
}

export default NoTransactions
