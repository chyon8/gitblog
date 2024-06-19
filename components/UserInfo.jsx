"use client";

import Image from "next/image";
import { Typography,Box,Button } from "@mui/material";
import { useSession,signOut } from "next-auth/react";

export default function UserInfo() {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <Box>


        <Box display='flex'>
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={60}
          height={60}
          alt="user"
        />
        <Box sx={{disaply:'grid',gap:3,ml:'15px',mt:'8px'}}>
        <Typography sx={{ml:'8px',mb:'5px'}} variant="answer" > {session?.user?.name}</Typography>
        <Button sx={{  color:'#FFFFFF',
            backgroundColor: '#252525',}} onClick={() => signOut()} 
      ><Typography >Sign out</Typography>
    </Button>
   
        </Box>

    
    
        </Box>



  

  

      


      </Box>
     
    );
  } else {
    return ;
  }
}






  
  