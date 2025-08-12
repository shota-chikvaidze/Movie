import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import './ProfileRating.css'
import { FaStar } from "react-icons/fa";

const ProfileRating = () => {

  const [userRatings, setUserRatings] = useState([])

  const fetchRatings = async () => {
    
    const token = localStorage.getItem('token')
    if(!token) return

    const decoded = jwtDecode(token)
    const userId = decoded.id

    try{

      const res = await axios.get(`http://localhost:5000/api/rating/get-user-rating/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUserRatings(res.data.ratings)

    }catch(err){
      console.error('error', err)  
    }

  }

  useEffect(() => {
    fetchRatings()
  }, [])

  const totalStars = 5;

  return (
    <>
      <div>
        {userRatings.length === 0 ? (
          <p className='no_ratings_para'>No ratings found.</p>
        ) : (
          userRatings.map((rating, index) => (
            <div key={index} className='all_ratings_item'>
              <p>{rating.movieId.title}</p>
              <div>
                {[...Array(totalStars)].map((_, i) =>
                  i < rating.rating ? (
                    <FaStar key={i} className='star_icon' color="#ffc107" />
                  ) : (
                    <FaStar key={i} className='star_icon' color="#ddd" />
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default ProfileRating
