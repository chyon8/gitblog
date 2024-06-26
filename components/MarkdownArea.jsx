// pages/index.js
import { useState,useEffect } from 'react';
import MarkdownEditor from '../components/MarkdownEditor';
import { Box } from '@mui/material';
export default function MarkdownArea({response,onValueChange}) {
  const [value, setValue] = useState("");

  useEffect(() => {
 setValue(response)

  }, [response]);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onValueChange(newValue); // Pass the value to the parent component
  };

  return (
    <Box sx={{mt:'14px'}}>
  
      <MarkdownEditor value={value} onChange={handleValueChange} />
    
    {/*  <div style={{color:'#FFFFFF'}} dangerouslySetInnerHTML={{ __html: value }} /> */}
    </Box>
  );
}
