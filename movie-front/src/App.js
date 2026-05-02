import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Registration } from './pages/registration/Registration';
import { Movie } from './pages/movies/Movie';
import { Login } from './pages/login/Login';
import { Series } from './pages/series/Series';
import { Actors } from './pages/actors/Actors';
import Layout from './layout/Layout'
import MovieDetails from './components/movieDetails/MovieDetails';
import Search from './components/search/Search'
import ErrorPage from './components/errorPage/ErrorPage'
import ActorDetails from './components/actorDetails/ActorDetails'


import MyList from './components/myList/MyList'
import Profile from './components/profile/Profile'
import UserComments from './components/userComments/UserComments'
import ProfileRating from './components/profileRating/ProfileRating'


import { useAuth } from './components/authProvider/AuthProvider';


function App() {

  const { user, loading } = useAuth()

  if(loading){
    return <p className='loading_style '>Wating for renders cold start...</p>
  }

  return (
    <>
      <Layout />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/register' element={ <Registration /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/movies' element={ <Movie /> } />
        <Route path='/series' element={ <Series /> } />
        <Route path='/movies/:id' element={ <MovieDetails /> } />
        <Route path='/search' element={ <Search /> } />
        <Route path='/actors' element={ <Actors /> } />
        <Route path='/actors/:id' element={ <ActorDetails /> } />
        <Route path='*' element={ <ErrorPage /> } />

        {user && (
          <>
            <Route path='/movie-list' element={ <MyList /> } />
            <Route path='/myProfile' element={ <Profile /> } />
            <Route path='/user-comments' element={ <UserComments /> } />
            <Route path='/user-ratings' element={ <ProfileRating /> } />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
