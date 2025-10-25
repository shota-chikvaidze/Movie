import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import './ProfileRating.css'
import { FaStar } from "react-icons/fa";
import { TbHttpDelete } from "react-icons/tb";

const ProfileRating = () => {

  const [userRatings, setUserRatings] = useState([])
  const [loading, setLoading] = useState(true)


  const fetchRatings = async () => {
    
    const token = localStorage.getItem('token')
    if(!token) return

    const decoded = jwtDecode(token)
    const userId = decoded.id

    try{

      setLoading(true)
      const res = await axios.get(`http://localhost:5000/api/rating/get-user-rating/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setUserRatings(res.data.ratings)
      setLoading(false)

    }catch(err){
      console.error('error', err)  
    }

  }

  useEffect(() => {
    fetchRatings()
  }, [])

  const deleteRating = async (ratingId) => {
    try{

      const token = localStorage.getItem('token')
      const res = await axios.delete(`http://localhost:5000/api/rating/delete-rating/${ratingId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUserRatings((prevRating) => {
        return prevRating.filter((del) => del._id !== ratingId)
      })

    }catch(err){
      console.error('error', err)
    }
  }

  const totalStars = 5;

  return (
    <>
      <div>

        {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className='all_ratings_item rating_skeleton'></div>
            ))
        ) : (
          userRatings.length === 0 ? (
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
                <TbHttpDelete className='rating_del_btn' onClick={() => deleteRating(rating._id)} />
              </div>
            ))
          )
        )}



      </div>
    </>
  )
}

export default ProfileRating
