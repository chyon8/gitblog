"use client";

import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import BASE_URL from '../app/config.js'
import PaginationRounded from "./Pagination"; 
import Link from "next/link";


function MyPost() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshCount, setRefreshCount] = useState(0);

  



  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/mypost?page=${currentPage}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage,refreshCount]);

  return (
    <Box sx={{ mb: '30px', mt: '80px' }}>
      <Typography sx={{ color: '#F0F0F0' }} fontWeight='600' fontSize='34px'>Posts</Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
          mt: 2,
          width: { xs: '100%' },
        }}
      >
        {data?.post?.length > 0 ? (
          data.post.map((posts, index) => (
            <Box
              key={index}
              sx={{
                padding: '16px',
                border: '1px solid rgb(52, 52, 52)',
                borderRadius: '16px',
                width: { lg: '300px' },
                bgcolor: '#191919',
              }}
            >
                <Link style={{textDecoration:'none'}} href={`/post/${posts._id}`}>
            <Box> <Typography variant="answer">{posts.post?.split(" ").slice(0, 8).join(" ")}</Typography></Box>
            </Link>
            </Box>
          ))
        ) : (
            <Box display='grid' sx={{gap:3,mt:'14px'}}>
                <Typography sx={{color:'#FFFFFF'}} fontSize="18px">No Posts yet </Typography>
                <a style={{textDecoration:'none'}} href={'/dashboard'}>
                <Button sx={{ color: '#0A0A0A', backgroundColor: '#00FF66', }}><Typography>Write a blog</Typography></Button></a>
                
             </Box>
        )}
      </Box>

      {data?.totalPages > 1 && (
        <Box sx={{ mt: '50px' }}>
          <PaginationRounded onPageChange={handlePageChange} totalPages={data?.totalPages} />
        </Box>
      )}
    </Box>
  );
}

export default MyPost;
