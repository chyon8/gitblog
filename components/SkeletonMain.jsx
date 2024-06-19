import { Box,Skeleton } from "@mui/material";



const SkeletonMain = () => {

  


    return (

     <Box>
        <Box
        sx={{
            display:'grid',
          gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: {xs:2,sm:2,md:2,lg:6},
          mt: 2,

         

        }}
      >
    <Skeleton variant="rounded" height='470px' width='100%'  sx={{borderRadius:'20px',minWidth:'320px'}} />
    <Skeleton variant="rounded" height='470px' width='100%'  sx={{borderRadius:'20px',minWidth:'320px'}} />
    <Skeleton variant="rounded" height='470px'  width='100%' sx={{borderRadius:'20px',minWidth:'320px'}} />
    </Box>
 
</Box>
  
  
    );
  };
  
  
  
  export default SkeletonMain;
  