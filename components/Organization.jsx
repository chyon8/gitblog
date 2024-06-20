"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, } from '@mui/material';


export default function Organization({orgs,setReposOrgParent,setOrgNameParent}) {
  const { data: session } = useSession();
  const [reposOrg,setReposOrg] =useState([])


  const fetchReposOrg = (org,orgName) => {


    if (session?.accessToken) {
      axios.get(org, {
        headers: {
          Authorization: `token ${session.accessToken}`
        },
      
      }).then((res) => {
        setReposOrg(res.data);
        setReposOrgParent(res.data);
        setOrgNameParent(orgName);
    
       
    
      }).catch((err) => {
        console.error("Error fetching commits:", err);
      });
    }
  };

console.log(orgs)


  return (
  <Box sx={{mt:'50px'}}>
        {orgs.map((org) => (
              <Box sx={{cursor:'pointer'}} key={org.id} onClick={() => fetchReposOrg(org.repos_url,org.login)}>
                <Box sx={{bgcolor:'#191919',padding: '16px',border: '1px solid rgb(52, 52, 52)',borderRadius: '16px 16px 16px 16px',minHeight:'50px'}}>
                 
                  <Box display="flex" >
                  <Box sx={{width:'30px',height:'30px',mt:'10px'}}><img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Font_Awesome_5_brands_github.svg" alt="github" /></Box>
               <Box display='grid' sx={{ml:'10px',mt:'16px'}}><Typography variant="answer" sx={{ cursor: 'pointer',mb:'5px' }}>{org.login}</Typography></Box>  
                </Box>
       
                </Box>
              
              </Box>
              
            ))}
    
    </Box>
       

  );
}
