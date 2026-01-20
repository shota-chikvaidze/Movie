import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { Link } from 'react-router-dom'
import backgroundMovies from '../../assets/images/movie-background.jpg'
import './Registration.css'

export const Registration = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{

      const res = await axios.post('/user/register', form)

      if(res.status === 201 && res.data.token){
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
        

          <form onSubmit={handleSubmit} className='register_form'>
            <h1> Register </h1>
            <input name='name' type='text' placeholder='Name' onChange={handleChange} required /> <br />
            <input name='lastname' type='text' placeholder='Lastname' onChange={handleChange} required /> <br />
            <input name='email' type='email' placeholder='Email' onChange={handleChange} required /> <br />
            <input name='password' type='password' placeholder='Password' onChange={handleChange} required /> <br />
            <button type='submit'>Register</button>
            <p>Have an Account? <span> <Link to={'/login'} className='registration_link'> Register </Link> </span> </p>
          </form>
        </div>
      </section>
    </>
  )
}
