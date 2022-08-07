import React from 'react'
import './bottombar.css'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import { Link } from 'react-router-dom';

const Bottombar = () => {
  return (
    <div className='btmbar_wrapper'>

      <Link to='/dashboard' >
        <HomeRoundedIcon/>
      </Link>

      <Link to='/profile' >
        <ExploreRoundedIcon/>
      </Link>

      {/* <Link to='/playlists' >
        <MusicNoteRoundedIcon/>
      </Link> */}

      <Link to='/chats' >
        <ChatBubbleRoundedIcon/>
      </Link>
      {/* <Link to='' >
        <HomeRoundedIcon/>
      </div> */}
    </div>
  )
}

export default Bottombar
