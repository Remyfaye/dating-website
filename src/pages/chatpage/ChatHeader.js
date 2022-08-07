 import React, { useState } from 'react'
 import SearchIcon from '@mui/icons-material/Search'
import ChatDisplay from './ChatDisplay'
 
 
 const ChatHeader = ({displayMatches,setBtnState, convos, active}) => {

  
   return (
     <div className='chat_header_wrapper'>

       <div className='chat_header_top'>
        <span className='logo'>Nectar</span>
        <SearchIcon className='search_icon' fontSize='large'/>
       </div>

       <div className='chat_header_bottom'>

        <div className={'bottom_list_items' + active}>
        <span className='chat_bottom_item' onClick={()=>setBtnState(true)}>conversations</span>
        <span className='bottom_numbers'>{convos.length}</span>
        </div>

        <div className='bottom_list_items'>
        <span className='chat_bottom_item' onClick={()=>setBtnState(false)}>saved</span>
        <span ></span>
        </div>

        
        
       
        {/* <span className='chat_bottom_item'>Chats</span> */}
       </div>
     </div>
   )
 }
 
 export default ChatHeader
 