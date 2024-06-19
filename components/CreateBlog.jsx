"use client";

import { useSession } from 'next-auth/react';
import {  useState } from 'react';
import { Typography, Box, Button, Checkbox } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown'
import BASE_URL from '@/app/config';


export default function CreateBlog({commitDetails,commitMsg}) {
  const { data: session } = useSession();


  const [selectedFiles, setSelectedFiles] = useState([]);
  const [checked, setChecked] = useState(false);
  const [response, setResponse] = useState('');
  const [type,setType]= useState(3)
 

  const [loading, setLoading] = useState(false); 


  if (!session) {
    return <div>Loading...</div>;
  }


  const handleContinue = () => {
    setChecked(true);
  };

  const handleSelect=(event)=>{
  setType(event.target.value)
  }

  const handleCreate = async () => {

    const patches = selectedFiles.map(file => file.patch).join('\n');

    setLoading(true);

    try {
        const res = await fetch('http://localhost:8000/create_blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: patches,commitMsg:commitMsg })
      });

      const data = await res.json();
      setResponse(data.response);
     
    
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while generating the blog.');
    } finally {
      // Set loading to false once the request is complete
      setLoading(false);
    }
  }; 





/*  
const formatResponse = (text) => {
    return text?.split('\n').map((line, index) => (
      <Typography sx={{color:'#DDDDDD',fontSize:'14px', letterSpacing: '0.04rem', lineHeight: '1.2rem'}} key={index} style={{ whiteSpace: 'pre-wrap' }}>{line}</Typography>
    ));
  };
  */

  const formatResponse = (text) => {
    return <ReactMarkdown>{text}</ReactMarkdown>;
  };


  const handleFileSelection = (file) => {
    setSelectedFiles(prevSelectedFiles => {
      if (prevSelectedFiles.includes(file)) {
        return prevSelectedFiles.filter(f => f !== file);
      } else {
        return [...prevSelectedFiles, file];
      }
    });
  };


  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(response.content).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Error copying to clipboard:', err);
    });
  };

  
  const handleSave = () =>{



    fetch(`${BASE_URL}/api/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({post:response.content}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setError(data?.errors[0]?.msg);
        } else {
          setError(data?.msg || 'Success');
          window.location.reload();
        
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
 

  return (

 <Box>
 
    <Box sx={{ height: '150px' }}>
        <Box display='grid' sx={{ gap: 3, mt: '50px', justifyContent: 'center' }}>
          <Typography sx={{ textAlign: 'center', color: '#FFFFFF' }} fontSize="18px">Select files and click continue</Typography>
          <Button onClick={handleCreate} disabled={selectedFiles.length === 0 || loading } sx={{ color: '#0A0A0A', backgroundColor: selectedFiles.length > 0 || loading ? '#00FF66' : "#252525" }}>
            <Typography sx={{ color: selectedFiles.length > 0 || loading ? '#0A0A0A' : '#FFFFFF' }}>Create a blog</Typography>
          </Button>
        </Box>

        <Box>
        <select onChange={handleSelect} style={{padding:4 ,background:'#252525',color:'white',borderRadius:'16px', border:'1px solid #252525'}} value={1} label="Type">
    <option value={1}>Ten</option>
    <option value={2}>Twenty</option>
    <option value={3}>Thirty</option>
    </select>
        </Box>
        
      </Box>
      <Box sx={{mb:'24px',bgcolor: response.content ? '#252525':"",padding:4,borderRadius:'16px',wordWrap: 'break-word', overflow: 'scroll' }}>   
      {response.content && !loading && (
          <Button onClick={handleCopyToClipboard} sx={{ mt: 2, color: '#FFFFFF', backgroundColor: '#00FF66' }}>
            Copy to Clipboard
          </Button>
        )}
      {loading ? <Typography variant='answer'>Writing...</Typography> :<Typography variant='answer' sx={{lineHeight: '2em'}}> {formatResponse(response.content)}</Typography>}
      {response.content && !loading && (
          <Button onClick={handleSave} sx={{ mt: 2, color: '#0A0A0A', backgroundColor: '#00FF66' }}>
            Save
          </Button>
        )}
    
      </Box>

      <Box><Typography variant='answer'>{commitMsg}</Typography></Box>

            <Box>
    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                          {commitDetails?.files.map(file => (
                            
                            // eslint-disable-next-line react/jsx-key
                            <Box sx={{ padding: 2, border: '1px solid rgb(52, 52, 52)', mb: 3, borderRadius: '16px' }}>
                            <Box key={file.filename} sx={{ overflow: 'hidden' }}>
                                <Box sx={{disaply:'flex'}}>
                            <Checkbox  checked={selectedFiles.includes(file)} 
                                onChange={() => handleFileSelection(file)}
                            sx={{ color: '#FFFFFF' }}/>
                              <Typography variant='answer'>{file.filename}</Typography>
                              </Box>
                              <SyntaxHighlighter language='diff' style={atomDark}>
                                {file.patch}
                              </SyntaxHighlighter>
                            </Box>
                            </Box>
                          ))}
                        </pre>
        </Box>


</Box>
  );
}
