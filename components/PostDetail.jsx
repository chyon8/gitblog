
'use client'

/* eslint-disable @next/next/no-img-element */


import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BASE_URL from '@/app/config';
import { Typography, Box,Button } from '@mui/material';
import ReactMarkdown from 'react-markdown'
import MarkdownArea from './MarkdownArea';

const PostDetail = (userId) => {
  const router = useParams();
  const postId = router.postid;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markdownValue, setMarkdownValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/post/${postId}`);
        const result = await response.json();
        setPost(result.post);
        setMarkdownValue(result.post.post)
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

  const handleMarkdownChange = (newValue) => {
    setMarkdownValue(newValue);
    // You can do anything else you need with the new value here
  };

  const handleSave = () =>{

    fetch(`${BASE_URL}/api/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({post:markdownValue,blogId:postId}),
    })
      .then((res) => res.json())
      .then((data) => {
       
        setBlogId(data.blogId)
        alert("saved")
        setSaved(true)
        
      
        if (data.errors) {
          
          
        } else {
          setError(data?.msg || 'Success');
       
         
        
        }
    
     
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
 

  return (

    
    <Box sx={{ display: 'grid' }}>


        <Box className="productDetail" sx={{overflow:'scroll', bgcolor:'#252525', border: '1px solid #222222', borderRadius: '20px', padding: { xs: '0px', sm: '25px', md: '25px', lg: '25px' } }}>
       
        <Button onClick={handleCopyToClipboard} size='small' sx={{ mt: 2, color: '#252525', backgroundColor: '#00FF66' }}>
            Copy to Clipboard
          </Button>

          <><MarkdownArea response={post.post} onValueChange={handleMarkdownChange} /><Button onClick={handleSave} sx={{ mt: 2, color: '#0A0A0A', backgroundColor: '#00FF66' }} >
            Save
          </Button></>
{/*
  <Typography variant='answer'>{formatResponse(post.post)}</Typography>
  */}

          </Box>





        </Box>



  );
};

export default PostDetail;





