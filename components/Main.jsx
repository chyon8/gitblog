

import { Box,Typography,Button } from "@mui/material";
import { useEffect,useState } from "react";
import CardItem from "./CardItem";
import BASE_URL from '../app/config.js'
import PaginationRounded from "./Pagination"; 
import Filter from '../components/Filter'
import SkeletonMain from "./SkeletonMain";
import TallyFeedbackBtn from "./TallyFeedbackBtn";

function Main() {

  const [data,setData]=useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);


  const handleDataFromFilter = (data) => {
   
    setData(data)
   
  };



  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
 
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Product?page=${currentPage}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);


  const openFilter = () =>{
    setIsOpen(!isOpen)
  }



    return (


    
  <Box sx={{mb:'30px'}}>

<Box sx={{height:'150px'}}>
<Box display='grid' sx={{gap:3,mt:'50px', justifyContent:'center'}}>
                <Typography sx={{textAlign:'center', color:'#FFFFFF'}} fontSize="18px">프로젝트를 등록해보세요! </Typography>
                <a style={{textDecoration:'none',textAlign:'center'}} href={'/add'}>
                <Button sx={{ color: '#0A0A0A', backgroundColor: '#00FF66', }}><Typography>프로젝트 등록하기</Typography></Button></a>
                
             </Box>
             </Box>

    <Typography sx={{color:'#F0F0F0'}} fontWeight='600' fontSize='34px'>프로젝트</Typography>
    <Button onClick={openFilter} sx={{mb:'24px',bgcolor:'#00FF66',mt:'15px'}} >
     {isOpen ? <Typography fontWeight='500' fontSize='14px' sx={{color:'#0A0A0A'}} >필터 닫기</Typography> : <Typography fontSize='14px' fontWeight='500' sx={{color:'#0A0A0A'}}>필터 열기</Typography>} 
      </Button>
{isOpen && ( 

<Filter onDataReceived={handleDataFromFilter}/>
)}


   


        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
            mt: 2,
            width: { xs: '100%'},
          }}
        >
          
          {data?.products ? (data?.products.map((products,index)=>(
  <Box
  key={index}
  
  sx={{
    padding: '16px',
    border: '1px solid rgb(52, 52, 52)',
    borderRadius: '16px 16px 16px 16px',
    width:{lg:'300px'},
    bgcolor:'#191919',
  }}
>
  <CardItem 
  data={products} 
  editable={false}

  />


</Box>
          )))
          :(
           <SkeletonMain/>
          )}

          {data?.totalCount === 0 && (
            <Box sx={{display:'grid',gap:1}}>
              <Typography fontWeight="600" variant="answer">찾으시는 프로젝트를 발견하지 못했어요...</Typography>
            <Typography fontWeight="600" variant="answer"> 다른 키워드를 검색해보세요!</Typography>
            </Box>
            )} 

        </Box>


        <Box sx={{mt:'50px'}}>
     <PaginationRounded onPageChange={handlePageChange} totalPages={data?.totalPages}/>

     </Box>

 <TallyFeedbackBtn/> 

</Box>
    
  )}
  
  export default Main;
  