// components/MarkdownEditor.js
import dynamic from 'next/dynamic';
import { Box,Typography,Button } from '@mui/material';
import '@uiw/react-md-editor/markdown-editor.css'
import '../app/styles/MarkdownEditor.css'
import { useState,useEffect } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const MarkdownEditor = ({ value, onChange }) => {

  const [mode, setMode]=useState('edit')
  const [editorHeight, setEditorHeight] = useState('');
  const customCommands = [];
  
  const changeMode = (mode)=>{
    setMode(mode)
  }

  const buttonStyles = (currentMode) => ({
    color: mode === currentMode ? '#00FF66' : '#FFFFFF',
  });


  useEffect(() => {
    const ref = document.getElementsByClassName('w-md-editor-content')[0]
    if(ref){
      const clientHeight=ref.clientHeight
  
      setEditorHeight(clientHeight);
   
    }
      

  
  }, [mode, value]);

 
  

  return (
    <Box style={{ background: 'none', padding: 0}}>

      <Box display='flex' sx={{justifyContent:'flex-end'}}>
      <Button onClick={() => changeMode('edit')} sx={{'&:hover': {backgroundColor: '#252525'}}}>
        <Typography sx={buttonStyles('edit')} variant='answer'>Edit</Typography>
        </Button>

      <Button onClick={() => changeMode('preview')} sx={{'&:hover': {backgroundColor: '#252525'}}} > 
        <Typography sx={buttonStyles('preview')} variant='answer'>preview</Typography>
        </Button>
    
      </Box>

      <MDEditor 
      value={value} 
      onChange={onChange}
      height={mode == "edit" ? '100%' : editorHeight}
      //commands={customCommands} 
      //preview='edit'
      preview={mode}
      hideToolbar={true}
       />
       
    </Box>
  );
};

export default MarkdownEditor;
