
'use client'

/* eslint-disable @next/next/no-img-element */


import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BASE_URL from '@/app/config';
import { Typography, Box,Button } from '@mui/material';
import ReactMarkdown from 'react-markdown'

const PostDetail = (userId) => {
  const router = useParams();
  const postId = router.postid;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/post/${postId}`);
        const result = await response.json();
        setPost(result.post);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [postId]);




  if (!post) {
    return <Typography variant='answer' fontweight="600">Post not found</Typography>;
  }

  const formatResponse = (text) => {
    return <ReactMarkdown>{text}</ReactMarkdown>;
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(post.post).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Error copying to clipboard:', err);
    });
  };

  return (

    
    <Box sx={{ display: 'grid' }}>


        <Box className="productDetail" sx={{overflow:'scroll', bgcolor:'#252525', border: '1px solid #222222', borderRadius: '20px', padding: { xs: '0px', sm: '25px', md: '25px', lg: '25px' } }}>
       
        <Button onClick={handleCopyToClipboard} size='small' sx={{ mt: 2, color: '#252525', backgroundColor: '#00FF66' }}>
            Copy to Clipboard
          </Button>

  <Typography variant='answer'>{formatResponse(post.post)}</Typography>
          </Box>





        </Box>



  );
};

export default PostDetail;





