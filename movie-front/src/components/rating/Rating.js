import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import './Rating.css'
import { FaStar } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";


const Rating = ({ movieId }) => {

    const [ hoverRating, setHoverRating ] = useState(null)
    const [ postRating, setPostRating ] = useState(null)
    const [ averageRating, setAverageRating ] = useState(null)
    const [ totalRating, setTotalRating ] = useState(null)

    
    const fetchRatingSummary = async () => {
        try{

            const res = await axios.get(`/rating/rating-summary?movieId=${movieId}`)
            setTotalRating(res.data.totalRating)
            setAverageRating(res.data.averageRating)

        }catch(err){
            console.error('error', err)
        }
    }
    
    useEffect(() => {
        fetchRatingSummary()
    }, [movieId])

    const handlePostRating = async (value) => {

        const token = localStorage.getItem('token')
        if(!token) return alert('You must be logged in to rate')

        try {

            const res = await axios.post(
              `/rating/post-rating/${movieId}`,
              { rating: value, movieId },
            );

            setPostRating(value);
            fetchRatingSummary();

        }catch (err) {
            console.error('error', err);
        }
    
    }

  return (
    <>
        <div className='rating_right'>
            <div className='star_icon_wrapper'>
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar 
                    key={star}
                    className={(hoverRating || postRating) >= star ? 'star_icon active' : 'star_icon'}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => handlePostRating(star)}

                    />
                ))}
            </div>
            <div className='rating_number'>
              {averageRating}
            </div>
            <div className='rating_users'>
              <AiOutlineUser className='user_icon' /> {totalRating}
            </div>
        </div>
    </>
  )
}

export default Rating
