/* eslint-disable @next/next/no-img-element */
"use client";

import { Box,Button,Typography,Container } from "@mui/material";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
export default function Navbar() {
  const { status,data: session } = useSession();


  return (
    <Container>
    <Box sx={{ bgcolor:'#191919',border:'1px solid #252525', boxShadow: '5px 6px 20px #000000',height:'auto',
      borderRadius:'15px',paddingTop:'15px',paddingRight:'15px',paddingBottom:'15px',paddingLeft:'35px',mb:'35px'}} 
    className="  flex justify-between items-center shadow-md">
    

    <Link className="font-bold text-lg" href={"/dashboard"} style={{textDecoration:'none',color:'white'}}>
<Box sx={{display:'flex'}}>
    <img src="https://i.ibb.co/XW9nnjg/gitblog-logo-custom.png" alt="logo" style={{width:'30px',height:'30px'}} />


       <Typography fontWeight='500' fontSize='18px'sx={{mt:'7px',ml:'4px'}} >Gitblog</Typography> 

      </Box>
      </Link>
      {status === "authenticated" ? (

<Box className="flex">

<Box sx={{display:'grid'}}>
<Typography fontSize='11px' variant="answer">Credits</Typography>
{session.user.subscribed ? (<Typography textAlign='center' variant="question"> &infin;</Typography>):
(<Typography textAlign='center' variant="answer">{session.user.credits}</Typography>)}

</Box>

        <Link className="font text-sm ml-2 mt-1" href={"/profile"}>
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={30}
          height={30}
          alt="user"
        />
            </Link>

            <a href={`/dashboard`} style={{textDecoration:'none',color:'inherit'}}>
<Button sx={{bgcolor:'#252525',mt:'2px',ml:'10px', borderRadius:'10px',pt:'10px',pr:'20px',pb:'10px',pl:'20px'}} ><Typography fontWeight='700' fontSize='14px'>Write</Typography></Button>
</a>

</Box>


      ) : (

    
        <Button sx={{ color:'#0A0A0A', backgroundColor: '#252525',color:'#FFFFFF'}}
        onClick={() => signIn("github")} 
            ><Typography fontWeight='600' >Sign in</Typography>
          </Button>
      


        

           
      )}
    </Box>
    </Container>
  );
}
