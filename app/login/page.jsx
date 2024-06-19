

import { Container,Box,Typography,Button } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from '@/models/User'; 
import LogInBox from "@/components/LogInBox";

const Home = async () => {

  const session = await getServerSession();
  const userEmail = session?.user.email
  const user = await User.findOne({ email: userEmail });
  const userId=(user?._id.toString())

  
  if(session){
    redirect('/')
  }

  return (
    <Container>

<LogInBox/>

    </Container>
  );
};

export default Home;
