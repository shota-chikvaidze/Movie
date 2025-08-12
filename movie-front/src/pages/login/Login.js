import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../../api/axios'
import backgroundMovies from '../../assets/images/movie-background.jpg'
import './Login.css'

export const Login = () => {

  const navigate = useNavigate()
  const [ form, setForm ] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{

      const res = await axios.post('/user/login', form)

      if(res.status === 200 && res.data.token){
        localStorage.setItem('token', res.data.token)
        window.location.href = '/';
      }

    }catch(err){
      console.error('error', err)
    }

  }

  return (
    <>
      <section className='login_section'>
        <div className='login_container'>
          <div className='background_img_wrapper'>
            <img src={backgroundMovies} alt='movies' className='background_img' />
          </div>

          <form onSubmit={handleSubmit} className='login_form'>
            <h1>Sign in</h1>
            <input name='email' type='email' placeholder='Email' onChange={handleChange} required /> <br />
            <input name='password' type='password' placeholder='Password' onChange={handleChange} required /> <br />
            <button type='submit'>Sign in</button>
            <p>Dont have an Account? <span> <Link to={'/register'} className='registration_link'> Register </Link> </span> </p>
          </form>
        </div>
      </section>
    </>
  )
}
