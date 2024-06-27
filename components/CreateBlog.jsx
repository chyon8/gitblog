"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Typography, Box, Button, Checkbox } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown'
import BASE_URL from '@/app/config';
import LottieAnimation from './LottieAnimation';
import MarkdownArea from './MarkdownArea';


export default function CreateBlog({commitDetails,commitMsg}) {
  const { data: session } = useSession();




  const [selectedFiles, setSelectedFiles] = useState([]);
  const [checked, setChecked] = useState(false);
  const [response, setResponse] = useState('');
  const [postType,setPostType]= useState("tutorial")
  const [lang,setLang]= useState("english")
  const [formality,setFormality]= useState("formal")
  const [tone,setTone]= useState("casual")
  const [saved,setSaved]= useState(false)
  const [loading, setLoading] = useState(false); 
  const [eventSource, setEventSource] = useState(null);
  const [markdownValue, setMarkdownValue] = useState('');
  const [blogId, setBlogId] = useState(null);
 

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);


  if (!session) {
    return <div>Loading...</div>;
  }

  const handleMarkdownChange = (newValue) => {
    setMarkdownValue(newValue);
    // You can do anything else you need with the new value here
  };

  const handleContinue = () => {
    setChecked(true);
  };

  const handleSelectType=(event)=>{
  setPostType(event.target.value)
  }

  const handleSelectLang=(event)=>{
    setLang(event.target.value)
    }

  const handleSelectTone=(event)=>{
      setTone(event.target.value)
      }

  const handleSelectFormal=(event)=>{
      setFormality(event.target.value)
      }

  const takeCredits =async () =>{
    try {
      const res = await fetch(`${BASE_URL}/api/credits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
  } catch (error) {
    console.error('Error:', error);

  }
  }

  const handleCreate = async () => {

    const patches = selectedFiles.map(file => file.patch).join('\n');
    setResponse('')
    setMarkdownValue('')
    setBlogId(null)
    setLoading(true);

    setLoading(true);

    try {
      if(session.user.credits > 0){
        const res = await fetch('http://localhost:8000/create_blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: patches,commitMsg:commitMsg,lang:lang, postType:postType,formality:formality,tone:tone })
      });
      const data = await res.json();
      setResponse(data.response);
      setMarkdownValue(data.response);
      takeCredits()

    }
    else{
      alert("no credits remaining")
    }


    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while generating the blog.');
    } finally {
      // Set loading to false once the request is complete
      setLoading(false);
      
    }
  }; 



/*
const handleCreate = async () => {
  const patches = selectedFiles.map(file => file.patch).join('\n');
  setResponse('')
  setMarkdownValue('')
  setBlogId(null)
  setLoading(true);

  try {
      if(session.user.credits > 0) {
          const res = await fetch('http://localhost:8000/start_blog', {
          //const res = await fetch(`${BASE_URL}/api/start_blog`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ text: patches, commitMsg: commitMsg, lang: lang, postType: postType })
          });
          const data = await res.json();
          const taskId = data.task_id;

          const eventSource = new EventSource(`http://localhost:8000/stream_blog/${taskId}`);

          eventSource.onmessage = (event) => {
              setLoading(false)
              const newMessage = event.data;
             if(newMessage === "DONEGENERATING"){
              eventSource.close()
              
              takeCredits(); 
          }
          else{
              setResponse((prevResponse) => prevResponse + newMessage);
              setMarkdownValue((prevResponse) => prevResponse + newMessage);
          }
          };
     
          eventSource.onerror = (error) => {
              console.error('Error:', error);
              eventSource.close()
              setResponse(prevResponse => prevResponse + ' An error occurred while generating the blog.');
              setLoading(false);
            
              
          };
       
        
          eventSource.onclose = () => {
            console.log("closed")
          
          };

      } else {
          alert("No credits remaining");
          setLoading(false);
      }
  } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while generating the blog.');
      setLoading(false);
  }
};
*/




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
    navigator.clipboard.writeText(markdownValue).then(() => {
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
      body: JSON.stringify({post:markdownValue,blogId:blogId}),
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

 <Box>

 
    <Box sx={{ height: '150px' }}>
        <Box display='grid' sx={{ gap: 3, mt: '50px', justifyContent: 'center' }}>
          <Typography sx={{ textAlign: 'center', color: '#FFFFFF' }} fontSize="18px">Select files and click continue</Typography>
          <Button onClick={handleCreate} disabled={selectedFiles.length === 0 || loading } sx={{ color: '#0A0A0A', backgroundColor: selectedFiles.length > 0 || loading ? '#00FF66' : "#252525" }}>
            <Typography sx={{ color: selectedFiles.length > 0 || loading ? '#0A0A0A' : '#FFFFFF' }}>Create a blog</Typography>
          </Button>
        </Box>


        <Box sx={{mt:'24px',display:'flex',gap:3}}>
          <Box sx={{display:'grid',gap:2}}>
          <Typography variant='answer'>Style</Typography>
        <select onChange={handleSelectType} value={postType} style={{padding:4 ,background:'#252525',color:'white',borderRadius:'16px', border:'1px solid #252525'}} label="Type">
    <option value="tutorial">Tutorial</option>
    <option value="developemt_diary">Development diary</option>
    <option value="retrospective">Retrospective</option>
    <option value="problem_solving">Problem solving</option>
    <option value="review_and_critique">Review and critique</option>
    <option value="free_style">Free Style</option>
    </select>
    </Box>

    <Box sx={{display:'grid',gap:2}}>
    <Typography variant='answer'>Language</Typography>
    <select onChange={handleSelectLang} value={lang} style={{padding:4 ,background:'#252525',color:'white',borderRadius:'16px', border:'1px solid #252525'}} label="Type">
    <option value="english">English</option>
    <option value="korean">Korean</option>
    <option value="japanese">Japanese</option>
    <option value="spanish">Spanish</option>
    <option value="french">French</option>

    </select>
   </Box>


   <Box sx={{display:'grid',gap:2}}>
    <Typography variant='answer'>Formality</Typography>
    <select onChange={handleSelectFormal} value={formality} style={{padding:4 ,background:'#252525',color:'white',borderRadius:'16px', border:'1px solid #252525'}} label="Type">
    <option value="formal">Formal</option>
    <option value="informal">Informal</option>

    </select>
   </Box>

   <Box sx={{display:'grid',gap:2}}>
    <Typography variant='answer'>Tone</Typography>
    <select onChange={handleSelectTone} value={tone} style={{padding:4 ,background:'#252525',color:'white',borderRadius:'16px', border:'1px solid #252525'}} label="Type">
    <option value="casual">Casual</option>
    <option value="professional">Professional</option>
    <option value="standard">Standard</option>
    <option value="funny">funny</option>

    </select>
   </Box>

        </Box>

      </Box>
      <Box sx={{mt:'50px' ,mb:'24px',bgcolor: response ? '#252525':"",padding:4,borderRadius:'16px',wordWrap: 'break-word', overflow: 'scroll' }}>   
      {response && !loading && (
          <Button size='small' onClick={handleCopyToClipboard} sx={{ mt: 2, color: '#252525', backgroundColor: '#00FF66' }}>
            Copy to Clipboard
          </Button>
        )}
      {loading && !response ? <LottieAnimation/> :  
   /* <Typography variant='answer' sx={{lineHeight: '2em'}}> {formatResponse(response)}</Typography> */
""
     }
      {response && !loading && (
            <><MarkdownArea response={response} onValueChange={handleMarkdownChange} /><Button onClick={handleSave} sx={{ mt: 2, color: '#0A0A0A', backgroundColor: '#00FF66' }} >
            Save
          </Button></>
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
