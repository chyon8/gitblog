"use client"

import UserInfo from "@/components/UserInfo";

import { useSession  } from "next-auth/react";
import { Container } from "@mui/material";
import MyPost from "@/components/MyPost";
import { redirect } from "next/navigation";


const getUserProfile = async () => {
    try {
     
// user 결제, 구독 정도 

  
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };


const Profile = () => {
  
  const { status } = useSession();


  if(status === "unauthenticated"){
    redirect('/login')
  }

  return (


    <Container >

<UserInfo/>



<MyPost/>


     </Container>



          )
 
 
};

export default Profile;



