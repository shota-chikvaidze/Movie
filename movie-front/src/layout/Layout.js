import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Layout.css'
import { useAuth } from '../components/authProvider/AuthProvider'

import { IoSearchOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import WebLogo from '../assets/images/webLogo.png';
import { LiaComments } from "react-icons/lia";

const Layout = () => {
  
  const [search, setSearch] = useState('');
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate()
  const { user, logoutUser, loading } = useAuth()

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?search=${encodeURIComponent(search.trim())}`);
    }
  };


  const handlePopup = () => {
    if(popup === true) {
      setPopup(false)
    }else(
      setPopup(true)
    )
  }


  return (
    <header>
      <div className='logo_links_wrapper'>
        <div className='navbar_logo'>
          <Link to={'/'} >
            <img src={WebLogo} alt='website logo' />
          </Link>
        </div>

        <ul className='navbar_links'>
          <Link to={'/movies'}> <li className='navbar_link'>Movies</li> </Link>
          <Link to={'/series'}> <li className='navbar_link'>Series</li> </Link>
          <Link to={'/actors'}> <li className='navbar_link'>Actors</li> </Link>
          <Link> <li className='navbar_link'>Anime</li> </Link>
        </ul>
      </div>
      <div className='search_user_wrapper'>
        <div className='search_div'>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch(e);
            }}
            placeholder="Search movies..."
          />
          <div className='search_icon_div' onClick={handleSearch} >
            <IoSearchOutline className='search_icon'/>
            <p> Search </p>
          </div>
        </div>

        {user ? (
          <>
            <div className='logged_in_user'>
              <FaUser className='user_logo' onClick={handlePopup} />
              
              {popup && (
                <>
                  <div className='user_popup'>

                    <ul className='loggedIn_user_list'>
                      <li>
                        <FaUserCircle className='my_list_icon' />
                        <Link to={'/myProfile'}>
                          <p> Your profile </p>
                        </Link>
                      </li>

                      <li>
                        <RiMovie2Line className='my_fav_icon' />
                        <Link to={'/movie-list'}>
                          <p> Your list </p>
                        </Link>
                      </li>

                      <li>
                        <LiaComments className='my_list_icon' />
                        <Link to={'/user-comments'}>
                          <p> Your Comments </p>
                        </Link>
                      </li>

                      <li>
                        <CiStar className='my_fav_icon' />
                        <Link to={'/user-ratings'}>
                          <p> Your Ratings </p>
                        </Link>
                      </li>
                    </ul>

                    <button onClick={logoutUser} className='sign_out_btn' >Sign Out</button>
                    
                  </div>
                </>
              )}

            </div>
          </>
        ) : (
          <>
            <div className='user_logo_wrapper'>
              <Link to='/login'>
                <FiUser className='user_logo' />
              </Link>
            </div>
          </>
        )}


        
      </div>
    </header>
  )
}

export default Layout
