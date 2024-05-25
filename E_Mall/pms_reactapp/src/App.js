import React from 'react'
import './App.css';
import AppRoutes from './components/approuters';
import { BrowserRouter as Router } from 'react-router-dom';
const App = () => {
  return (
  <Router>
      <div className="flex-lg-column">
      
       {/* <HomeS/> */}
      
           <AppRoutes/>
      
      </div>

    </Router>

  )
}

export default App

