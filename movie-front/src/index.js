import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './components/authProvider/AuthProvider';


const ScrollToTop = () => {
  
    const { pathname, search } = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [pathname, search])

    return null

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProvider>
      <ScrollToTop />
      <App />
    </AuthProvider>
  </Router>
);
