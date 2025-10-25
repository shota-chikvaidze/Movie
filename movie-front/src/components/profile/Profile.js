import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import './Profile.css'
import userAvatar from '../../assets/images/user-avatar.png'
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

const Profile = () => {

    const [getUser, setGetUser] = useState({})
    const [myList, setMyList] = useState([])
    const [userComment, setUserComment] = useState([])
    const [userRating, setUserRating] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try{

            setLoading(true)

            const res = await axios.get('/user/getUser')
            
            setGetUser(res.data.user)
            setMyList(res.data.user.myList)
            setLoading(false)

        }catch(err){
            console.error('error', err)
        }
    }


    const fetchComments = async () => {
        try{
            
            
            const token = localStorage.getItem('token')
            if(!token) return

            const decoded = jwtDecode(token)
            const userId = decoded.id

            const res = await axios.get(`http://localhost:5000/api/comment/get-user-comment/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('Response:', res.data);
            console.log('Decoded Token:', decoded);
            

            setUserComment(res.data.userComments)


        }catch(err){
            console.error('error', err)
        }
    }

    
    const fetchRating = async () => {
        try{

            const token = localStorage.getItem('token')
            if(!token) return

            const decoded = jwtDecode(token)
            const userId = decoded.id

            const res = await axios.get(`http://localhost:5000/api/rating/get-user-rating/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUserRating(res.data.ratings)

        }catch(err){
            console.error('error', err)
        }
    }

    useEffect(() => {
        fetchRating()
        fetchComments()
        fetchUser()
    }, [])
    

  return (
    <>
    
        <section className='profile_section'>
            <div className='profile_data'>

                <div className='profile_data_left'>
                    <div className='profile_data_image_wrapper'>
                        <img src={userAvatar} alt='user avatar' />
                    </div>
                    { loading ? (
                        <>
                            {Array.from({ length: 1 }).map((_, index) => (
                                <div key={index} className='user_name_date skeleton_profile_card'>
                                    <div className="skeleton skeleton-name"></div>
                                    <div className="skeleton skeleton-date"></div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <div className='user_name_date'>
                                <h1> {getUser.name} {getUser.lastname} </h1>
                                <p> <MdOutlineDateRange /> Joined: {new Date(getUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                            </div>
                        </>
                    ) }
                </div>

                <div className='profile_data_right'>

                    { loading ? (
                        <>
                            {Array.from({ length: 4 }).map((_, index) => (
                               <div key={index} className='profile_my_list skeleton_card'>
                                    <div className="skeleton_text short"></div> 
                                    <div className="skeleton_text"></div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <Link to={'/movie-list'}>
                                <div className={myList.length === 0 ? 'profile_my_list list_gray' : 'profile_my_list list_white'} >
                                    <p>Movie List</p>
                                    <h3>{myList.length}</h3>
                                </div>
                            </Link>
                            
                            <Link to={'/user-comments'}>
                                <div className={userComment.length === 0 ? 'profile_my_list list_gray' : 'profile_my_list list_white'} >
                                    <p>Comments</p>
                                    <h3>{userComment.length}</h3>
                                </div>
                            </Link>
                            
                            <Link to={'/user-ratings'}>
                                <div className={userRating.length === 0 ? 'profile_my_list list_gray' : 'profile_my_list list_white'} >
                                    <p>Ratings</p>
                                    <h3>{userRating.length}</h3>
                                </div>
                            </Link>
                            
                            <Link to={'/myList'}>
                                <div className={myList.length === 0 ? 'profile_my_list list_gray' : 'profile_my_list list_white'} >
                                    {/* <p>Movie List</p>
                                    <h3>{myList.length}</h3> */}
                                </div>
                            </Link>
                        </>
                    ) }

                </div>

            </div>
        </section>

    </>
  )
}

export default Profile
