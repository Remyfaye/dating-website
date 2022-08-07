
import React, { useEffect, useState } from 'react'
import { useCookies } from "react-cookie"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const API_BASE = "https://faysdatingwebapp.herokuapp.com/"

const MatchesDisplay = ({user, setClickedUser}) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const matches = user?.[0].matches
    // const matchedUserId = matches.map(({user_id}) => user_id)
    // const matchedUserIds = matches?.map((m) => m)
    const matchedUserIds = matches?.map(m => m )
    const userId = user?.[0]._id
    //console.log(userId)

    const getMatches = async () => {
        const response = await axios.get(API_BASE + 'users/getmatches', {
          params:{userId}
        })
        //console.log(response)
        setMatchedProfiles(response.data)
    }
    //console.log(matchedProfiles)
     
    useEffect(() => {
      getMatches()
    }, [matchedUserIds])
  
  return (
    <div className='match_container'> 

    { matchedProfiles?.map( match => (
         <div className='match_wrapper' onClick={() => setClickedUser(match)}>

         <div className='match_img_container'>
             <img src={PF + match.url}/>
         </div>
 
         
 
         <div className='match_info'>
             <span className='match_info_name'>{match.first_name}</span>
             <span>{match.about}</span>
         </div>
 
       </div>
 
    ))}

     
      

      
    </div>
  )
}

export default MatchesDisplay
