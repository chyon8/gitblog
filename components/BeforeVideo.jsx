"use client"

import { Box} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useState } from 'react';


function BeforeVideo({onClickedVideo}) {



    const handleClick = () => {
      
        onClickedVideo(true)
        
      };

  return (



    <Box onClick={handleClick} sx={{ border:'0.5px solid rgb(52,52,52)',position: 'relative', display: 'grid', placeItems: 'center' }}>
    <img src='/images/capture.png' style={{ width: '100%', height: 'auto' }} alt="Capture"></img>
    <PlayCircleIcon sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#FFFFFF', fontSize: 64 }} />
</Box>



       



  );
}

export default BeforeVideo;
