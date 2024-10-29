import React from 'react'
import Header from './Header'

function LandingPage() {
  return (
    <div>
       <Header/> 
      <section >
  <div className="mx-auto max-w-screen-xl px-10 flex flex-col  py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        Track Every Penny,

        <span className="sm:block"> Master Every ₹upee</span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
      Take control of your finances with ease! Our expense app helps you track your spending, set budgets, and gain insights into your financial habits, all in one simple and intuitive platform.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/signup"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-black hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto hover:text-white"
          href="/signin"
        >
          LogIn
        </a>
      </div>
    </div>
    <div className='mt-8 shadow-lg rounded-lg'>
      <img src="/assets/Home.png"/>
    </div>
  </div>
</section>
    </div>
  )
}

export default LandingPage
