"use client"

import { Box} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


function VideoDemo() 
{
    const router = useRouter()

    const [isClient, setIsClient] = useState(false);


    useEffect(() => {
      setIsClient(true);
    }, []);



  return (

    <Box>


        <Box sx={{ alignContent: 'center', justifyContent: 'center', display: 'grid' }}>
        
          <Box>
          {isClient && (
        <video style={{width:'100%',height:'auto'}} controls autoplay>
          <source src="/gitblog.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
          </Box>
      
    

        </Box>
  

      </Box>

  );
}

export default VideoDemo;
