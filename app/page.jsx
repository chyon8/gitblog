"use client"

import { Container,Box } from "@mui/material";
import Main from "@/components/Main";
import { redirect } from "next/navigation";

const Home = () => {

  redirect('/dashboard')

  return (
    <Container>
     
     <Box >
   
   {/*
     <Main/>
     */}
     </Box>
     
  

    </Container>
  );
};

export default Home;
