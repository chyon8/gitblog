

import { Container,Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from '@/models/User'; 


const Home = async () => {

  const session = await getServerSession();
  const userEmail = session?.user.email
  const user = await User.findOne({ email: userEmail });
  const userId=(user?._id.toString())

  
  if(!session){
    redirect('/login')
  }

  return (
    <Container>
   
   <Box sx={{display:'flex'}}>
  
  
  <iframe data-tally-src={`https://tally.so/embed/wgA4ql?user=${userId}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`} loading="lazy" width="100%" height="200" frameborder="0" marginheight="0" marginwidth="0" title="사이드 프로젝트 등록하기"></iframe>
    
     </Box>


    </Container>
  );
};

export default Home;
