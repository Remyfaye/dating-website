import {useEffect, useState} from 'react'
import Header from '../../components/header/Header'
import './home.css'
// import Online from '../../components/online/Online'
// import Post from '../../components/posts/Post'
// import Feed from '../../components/feed/Feed'
import Bottombar from '../../components/bottombar/Bottombar';
import AuthModal from '../../AuthModal';
// import axios from 'axios'
// import Share from '../../components/share/Share'
// const API_BASE = "http://localhost:8800/api/"

const Home = ({minimal}) => {

  const [clickedmodal, setClickedModal] = useState(false)
  const [btnClicked, setBtnClicked] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  
  const authToken = false

  
  const handleClick = () => {
    console.log('clicked')
    setIsSignUp(true)
    setClickedModal(true)
    setBtnClicked(true)
    
  }
  const handleClickLogin = () => {
    console.log('clicked')
    setIsSignUp(false)
    setClickedModal(true)
    setBtnClicked(true)
    
  }
  const cancelClick = () => {
    console.log('clicked')
    setClickedModal(false)
    setBtnClicked(false)
    
  }
  return (

    <div className='home'>

      <div className='header'>
      <Header 
      authToken={authToken}
      handleClickLogin={handleClickLogin}
      />
      </div>

      {!btnClicked && <div className='home_center'>
        <h1 className='home_text' style={{fontSize:"40px"}}>Welcome! </h1> <br/><h3>Begin your search for a new companion...</h3>
        
          {/* {!authToken && !minimal && 
          <button className='primary_btn' onClick={handleClick}>
          </button>} */}
        
         
        <button className='primary_btn' onClick={handleClick}>
          {authToken ? "signout" : 'create account'}
        </button>

      </div>}

      

      {clickedmodal && <AuthModal 
      cancelClick={cancelClick}
      handleClick={handleClick}
      isSignUp={isSignUp}
      handleClickLogin={handleClickLogin}/>}

      
    
      {/* <div className='bottombar'>
          <Bottombar/>
      </div> */}
      
     
    </div>
  )
}

export default Home
