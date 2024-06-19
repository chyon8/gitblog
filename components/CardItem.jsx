/* eslint-disable @next/next/no-img-element */
"use client";

import { Box,Typography,Card,CardActions,CardContent,Chip,Avatar,Button } from "@mui/material";
import Link from "next/link";
import { typography } from "@/app/themeValue";
import TimeSincePost from "./TImeSincePost";
import { useSession  } from "next-auth/react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import Warning from "./Warning";
import BASE_URL from "@/app/config";

function CardItem({data,editable,setRefreshCount}) {

  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  


  const deleteMyReview = async (productId) => {
    try {
      setRefreshCount((count) => count + 1);
      setOpen(false);
      const response = await fetch(`${BASE_URL}/api/Product/delete`, {
        method: 'DELETE',
        body: JSON.stringify(productId),
       
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };










  
    return  (
  <Box>



   <Card
              key={data._id}
              sx={{
                display: 'flex',
                bgcolor:'#191919',
                flexDirection: 'column',
                    
                width: '100%',
                margin: '0 auto',
                maxWidth: '100%',
                boxShadow:'none'
              }}
            >

<Warning open={open} setOpen={setOpen} handleDelete={() => deleteMyReview(data._id)} />

           
              <CardContent sx={{ padding: '0' }}>

<Box sx={{display:'flex', justifyContent:'space-between'}}>
              <Box mb={2} sx={{display:'flex',gap:1}}>
                      {data.category.map((cat,index) =>(
                         <Chip sx={{mr:'3px',paddingTop:'3px',paddingBottom:'3px',paddingLeft:'3px',paddingRight:'3px'}} key={index} size="small" variant="outlined" label={cat}/>
                      ))} </Box>
{editable && (<Box><Button  onClick={() => {setOpen(true);}} sx={{padding:0}}>  <DeleteIcon/></Button></Box>
)}

</Box>

              <Link style={{ textDecorationLine: 'none', color: 'inherit' }} 
               href={`/Product/${data._id}`}>
        <Box
          sx={{
            width: '100%',
            height: '230px',   
            top: 0,
            left: 0,
         
            background: 'linear-gradient(180.00deg, rgba(25, 25, 25, 0) 49.967%,rgba(25, 25, 25, 0.7) 100%)',
          }}
        >
        <img
          style={{  
            borderRadius:'10px',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0
          }}
          src={data?.thumbnail && data.thumbnail.length > 0 ? data.thumbnail : "https://i.ibb.co/Bc10XpB/sellup.jpg"}
          //src={data?.thumbnail}
         
   
          alt='product'
        />
</Box>
      
      </Link>
                <Box
                  sx={{
                    display: 'flex',    
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    border:'0px',
              
                  }}
                >
                 

                  <Box display="grid">



                    <Box className="user" sx={{mt:'14px'}}
                     display="flex">

                <Box sx={{mr:'5px'}}>
                    <Avatar
                      style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                      src={data?.user.image}
                      alt="user"
                    />
                  </Box>
                      <Typography
                      fontWeight='500'
                        variant="body1"
                        sx={{
                          //alignContent: 'center',
                          maxWidth: '100px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          mt:'7px'
                        }}
                      >
                    
                        <Typography>{data.user.name}</Typography>
                      </Typography>


                      <Typography
                      fontSize="11px"
                      fontWeight='600'
                        sx={{
                          color: 'rgb(168, 168, 168)',
                          ml: '4px',
                          textAlign: 'left',
                       mt:'9px'
                        }}
                      >
                 <TimeSincePost createdAt={data.createdAt} /> 
                      </Typography>
                    </Box>
                  
                  </Box>
                </Box>

                <Link href={`/Product/${data._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Box sx={{mb:'14px'}} >
                    <Typography
                     
                      fontWeight="700"
                      fontSize="18px"
                      component="div"
                      sx={{
                        textAlign: 'left',
                        mt: '15px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {data.title}
                    </Typography>
                    <Typography
                      
                      fontSize={typography.size.md}
                      fontWeight={typography.weight.regular}
                      component="div"
                      sx={{
                        textAlign: 'left',
                        mt: '6px',
                        height: '45px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '15px',
                        letterSpacing: '-4%',
                      }}
                    >
                     {data?.description}
                    </Typography>
                  </Box>
                </Link>
              </CardContent>
              <CardActions  
              sx={{  width:'auto',padding:0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent:'space-between',
                    width:'100%',
                    borderTop:'1px solid #333333',

  
                   }}>
                
                <Box sx={{ mt:'10px', p:1, flex:1, display:'grid',gap:2,textAlign:'center'}}>
                <Typography>종류</Typography>
                <Typography fontSize='12px'>{data.type.join(', ')}</Typography>

              
                </Box>

                <Box sx={{mt:'10px', p:1,flex:1, display:'grid', gap:2, textAlign:'center'}}>
                <Typography>판매 가격</Typography>
                  <Typography fontSize='12px'>{data.price? data.price.toLocaleString() + "원" : "합의 가능"}</Typography>
             
                </Box>

                <Box sx={{mt:'10px',p:1,flex:1, display:'grid',gap:2,textAlign:'center'}}>
                <Typography>수익</Typography>
                  <Typography fontSize='12pz'>{data.revenue}</Typography>
                 
                </Box>
              
                </Box>
              </CardActions>
            </Card>

  
  </Box>
    
  )}
  
  export default CardItem;
  