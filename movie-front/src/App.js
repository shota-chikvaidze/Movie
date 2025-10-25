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
import MyList from './components/myList/MyList'
import ErrorPage from './components/errorPage/ErrorPage'
import Profile from './components/profile/Profile'
import UserComments from './components/userComments/UserComments'
import ProfileRating from './components/profileRating/ProfileRating'
import ActorDetails from './components/actorDetails/ActorDetails'

function App() {
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
        <Route path='/movie-list' element={ <MyList /> } />
        <Route path='*' element={ <ErrorPage /> } />
        <Route path='/myProfile' element={ <Profile /> } />
        <Route path='/user-comments' element={ <UserComments /> } />
        <Route path='/user-ratings' element={ <ProfileRating /> } />
      </Routes>
    </>
  );
}

export default App;
