"use client";

import { Box, Typography, Button } from "@mui/material";
import { useState,useEffect } from "react";


export default function Filter({onDataReceived}) {
  const [typeValue, setTypeValue] = useState([]);
  const [catValue, setCatValue] = useState([]);




  const fileter_type = [
    "웹사이트", "웹앱", "모바일앱", "이커머스", "랜딩페이지", "유튜브 채널", "뉴스레터", "기타"
  ];

  const fileter_category = [
    "AI", "생산성", "플랫폼", "라이프스타일", "금융", "소셜", "미디어", "교육", "블록체인", "노코드",
    "커뮤니티", "디자인", "개발", "마케팅", "게임", "여행", "건강", "기타"
  ];

  const handleTypeClick = (type) => {

    setTypeValue((prev) =>
      prev?.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleCategoryClick = (cat) => {

    setCatValue((prev) =>
      prev?.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSearchClick = async () => {
    const params = new URLSearchParams({
      type: typeValue.join(','),
      category: catValue.join(',')
    });
    const response = await fetch(`/api/Product?${params}`);
    const data = await response.json();
    onDataReceived(data);

  };

  

  return (
    <Box sx={{ mb: '40px' }}>
      <Box sx={{ mb: '30px' }}>
        <Typography fontSize='15px' fontWeight='600' sx={{ mb: '10px',color:'#FFFF' }}>종류</Typography>
         <Box sx={{display:'flex',flexWrap:'wrap'}}>
        {fileter_type.map((type, index) => (
        
            <Box 
            onClick={() => handleTypeClick(type)}
            sx={{ width:'fit-content',borderRadius:20 ,pt: '8px',pr:'20px',pb:'8px',pl:'20px', mt: '10px', mr: '10px',cursor:'pointer',bgcolor: typeValue?.includes(type) ? '#00FF66' : '#252525',}}
            key={index}
            size="small"
          >
            <Typography fontSize='14px' fontWeight='700' sx={{whiteSpace:'nowrap',color:typeValue?.includes(type) ? '#0A0A0A': '#F0F0F0'}}>{type}</Typography>
          </Box>
     

        ))}
        </Box>
      </Box>

      <Box>
        <Typography fontWeight='600' fontSize='15px' sx={{ mb: '10px',color:'#FFFF' }}>카테고리</Typography>
        <Box sx={{display:'flex',flexWrap:'wrap'}}>
        {fileter_category.map((cat, index) => (
          <Box
            onClick={() => handleCategoryClick(cat)}
            sx={{ width:'fit-content',borderRadius:20, pt: '8px',pr:'20px',pb:'8px',pl:'20px', mt: '10px', mr: '10px',cursor:'pointer' ,bgcolor: catValue?.includes(cat) ? '#00FF66' : '#252525' }}
            key={index}
            size="small"
           
          >
            <Typography fontSize='14px' fontWeight='700' sx={{color: catValue?.includes(cat) ? '#0A0A0A' :'#F0F0F0'}}>{cat}</Typography>
          </Box>
        ))}
        </Box>
      </Box>

      <Box sx={{ mt: '35px', gap:2, display:'flex' }}>
        <Button sx={{ bgcolor:'#00FF66'}} onClick={handleSearchClick} >
<Typography fontWeight='500' fontSize='14px' sx={{color:'#0A0A0A'}} >찾기</Typography>
        </Button>

        <a style={{textDecoration:'none'}} href={'/'}>
        <Button sx={{ bgcolor:'#00FF66'}}>
        
<Typography fontWeight='500' fontSize='14px' sx={{color:'#0A0A0A'}} >리셋</Typography>
</Button></a> 

      </Box>
    </Box>
  );
}

