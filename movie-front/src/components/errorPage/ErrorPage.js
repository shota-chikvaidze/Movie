import React from 'react'
import { Link } from 'react-router-dom'
import './ErrorPage.css'

const ErrorPage = () => {
  return (
    <section className='error_section'>
      <div className='error_container'>
        <h1>Lost your Way?</h1>
        <p>Sorry, we can't find that page. You'll find lots to explore on the <br /> home page.</p>
        <Link to={'/'}>
          <button className='navigate_home_error'>
            Home
          </button>
        </Link>
      </div>
    </section>
  )
}

export default ErrorPage
