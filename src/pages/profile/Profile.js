import React,{useState, useEffect, useContext} from 'react'

import './profile.css'
import SearchIcon from '@mui/icons-material/Search'
import Bottombar from '../../components/bottombar/Bottombar'

import axios from 'axios'
import { Link } from 'react-router-dom'
import {useParams} from 'react-router'
import { useCookies } from "react-cookie"
const API_BASE = "https://faysdatingwebapp.herokuapp.com/"



const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['User'])
  const[user, setUser] = useState(null)
  const [matchedProfiles, setMatchedProfiles] = useState(null)
  const [isMatches, setIsMatches] = useState(true)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const userId = cookies.UserId

  const getUser = async () => {
    try{
      const response = await axios.get(API_BASE + 'users/user' , {
        params:{userId}
      })
      setUser(response.data)
       //console.log(user)
    }catch(err){
      console.log(err)
    }
    
} 

const getMatches = async () => {
  const response = await axios.get(API_BASE + 'users/getmatches', {
    params:{userId}
  })
  //console.log(response)
  console.log(response.data)
  setMatchedProfiles(response.data)
}

const logOut = () => {
  removeCookie('UserId', cookies.UserId)
  window.location.reload()
}

 

  useEffect(() => {
    getUser()
    getMatches()
  },[user])

 
  return (
    <div className='profile_wrapper'>
        <div className='profile_icons'>
            
        </div>
      <div className='profile_top'>

        <div className='top_center'>
            <span></span>
            <span>{user?.[0].first_name}</span>
        </div>

        <div className='top_center'>
            <img src={PF + user?.[0].url}className='profilePage_img'/>
            {/* <span>{user?.[0].first_name}</span> */}
            {/* <span>{user?.[0].about}</span> */}
        </div>

        <div className='top_center'>
            {/* <span>{playlistNo.length}</span> */}
            <span>{user?.[0].about}</span>
        </div>
      </div>

      <div className='profile-center'>
        <div className='center_item'>
            <span className='center_list_item' onClick={() => setIsMatches(true)}>Matches</span>
            <span className='center_list_item'onClick={logOut}>logOut</span>
        </div>
      </div>

      <hr/>

      <div className='match_container'> 

      {matchedProfiles 
        
          ? <>{ matchedProfiles?.map( match => (
            <div className='match_wrapper' >
                <div className='match_img_container'>
                    <img src={PF + match?.url}/>
                </div>        
    
                <div className='match_info'>
                    <span className='match_info_name'>{match.first_name}</span>
                    <span>{match.about}</span>
                </div>
              </div>
            ))}</>

          : <div>You have not saved anyone...</div>

        
      }

      {/* <div className='profile_btm'>
        <div className='btm_top'>
            <span className='btm_text'>Posts</span>
            <span className='btm_text'>Playlists</span>
            <span className='btm_text'>saved</span>
        </div>
         
      </div> */}


          <div className='bottombar'>
              <Bottombar/>
          </div>
    </div>
    </div>
  )
}

export default Profile
