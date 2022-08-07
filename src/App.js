import {useState,useEffect} from 'react'
import './App.css';
// import Login from './components/login/Login';

import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
// import Register from './components/register/Register';
import OnBoarding from './pages/onboarding/OnBoarding'
import DashBoard from './pages/dashboard/DashBoard'
import ChatPage from './pages/chatpage/ChatPage';
import Message from './pages/chatpage/Message';
import ChatDisplay from './pages/chatpage/ChatDisplay';
import ChatInput from './pages/chatpage/ChatInput';

import { useCookies } from "react-cookie"
import axios from 'axios'

const API_BASE = "https://faysdatingwebapp.herokuapp.com/"

// import {useContext} from 'react'


function App() {

  const[user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['User'])
  const [getMatch, setGetMatch] = useState(null)
  const[genderedUser, setGenderedUser] = useState([])
  const[matchDisplay, setMatchDisplay] = useState(false)
  const[chatDisplay, setChatDisplay] = useState(true)
  const[clickedConvo, setClickedConvo] = useState(null)
  const userId = cookies.UserId

  // const clickedDisplay = () => {
  //   setClickedConvo(convo)
  //   navigate('messages')
  // }


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>

        <Route path='/profile' element={<Profile/>}></Route>

        <Route path='/dashboard' element={<DashBoard/>}></Route>

        <Route path='/onboarding' element={<OnBoarding/>}></Route>

        <Route path='/messages' element={<Message/>}></Route>

        <Route path='/chats' element={<ChatPage user={user}/>}></Route>

        {/* <Route path='/chats' element={<ChatDisplay />}></Route> */}
        {/* <Route path='/username' element={<ChatInput/>}></Route> */}

        {/* <Route path='/profile/:username' element={<Profile/>}></Route>
        
        <Route path='/login'  element={user ? <Navigate replace to='/'/> :<Login/>}> </Route>
      
        
        <Route path='/register' element={user ? <Navigate replace to='/'/>:<Register/> }></Route> */}
         
      </Routes>

      
  
      
      
      {/* <Home/> */}
    {/* <Profile/> */}
    {/* <div className='login'>
    <Login/>
    </div> */}
      </BrowserRouter>

      

      
	</>	
    
    

		
			
  )
}

export default App;
