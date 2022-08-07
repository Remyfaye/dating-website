import React, { useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import './header.css'
import { Link } from 'react-router-dom'


const Header = ({minimal, authToken,user,otherUser, handleClickLogin,username}) => {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  
  return (
    <nav >

      
          <div className='header_wrapper'>

          {!username 
          ? <span className='logo'>Nectar</span>
         : <span className='logo'>{username}</span>}
            
    
            { !authToken && !minimal 
    
            ? <button className='primary_btn2' onClick={handleClickLogin}>
                log in
              </button>
    
             :<div>
              {otherUser 
                ?<img className='headerimg' src={PF + otherUser?.[0].url}/>
                :<img className='headerimg' src={PF + user?.[0].url}/>
              }
              </div>
             
            
             } 
            
     
           
            
          </div>
      
      
      

    </nav>
  )
}

export default Header
