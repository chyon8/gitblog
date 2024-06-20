"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, Container, Button, Checkbox } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CreateBlog from '@/components/CreateBlog';
import PaginationRounded from '@/components/Pagination';
import TimeSincePost from '@/components/TImeSincePost';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Organization from '@/components/Organization';
import { redirect } from 'next/navigation';


export default function DashboardOrg() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [commitDetails, setCommitDetails] = useState({});
  const [openCommits, setOpenCommits] = useState({});
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [checked, setChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages]=useState(1)
  const [orgs, setOrgs] = useState([]);
  const [orgName, setOrgName] = useState(null);



  useEffect(() => {
    if (session?.accessToken) {
      axios.get('https://api.github.com/user/orgs', {
        headers: {
          Authorization: `token ${session.accessToken}`
        },
        params: {
          visibility: 'all',
          sort: 'updated',
        },
      }).then((res) => {
        setOrgs(res.data);
      }).catch((err) => {
        console.error("Error fetching repositories:", err);
      });
    }
  }, [session]);


  if(!session?.user.subscribed){
    redirect('/dashboard')
    }

  useEffect(() => {
    if (selectedRepo) {
      fetchCommits(selectedRepo, currentPage);
    }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRepo, currentPage]);
  
  const fetchCommits = (repoName) => {

    if (session?.accessToken) {
      axios.get(`https://api.github.com/repos/${orgName}/${repoName}/commits`, {
        headers: {
          Authorization: `token ${session.accessToken}`
        },
        params: {
          per_page: 10,
          page: currentPage
        }
      }).then((res) => {
        setCommits(res.data);
        setSelectedRepo(repoName);
        setSelectedCommit(null);
       
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        const linkHeader = res.headers.link;
        if (linkHeader) {
          const totalPages = getTotalPages(linkHeader);
          setTotalPages(totalPages);
         
        } else {
          setTotalPages(1);
        }

      }).catch((err) => {
        console.error("Error fetching commits:", err);
      });
    }
  };
 
  const getTotalPages = (linkHeader) => {
    const links = linkHeader.split(',');
    for (let link of links) {
      if (link.includes('rel="last"')) {
        const match = link.match(/&page=(\d+)/);
        if (match) {
          return parseInt(match[1], 10);
        }
      }
    }
    return 1;
  };



  const toggleCommit = (sha) => {
    setOpenCommits(prevOpenCommits => ({
      ...prevOpenCommits,
      [sha]: !prevOpenCommits[sha] // Toggle the state for the commit SHA
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
 
};

  const fetchCommitDetails = (repoName, sha) => {
    if (session?.accessToken) {
      axios.get(`https://api.github.com/repos/${orgName}/${repoName}/commits/${sha}`, {
        headers: {
          Authorization: `token ${session.accessToken}`
        }
      }).then((res) => {
        setCommitDetails(prevDetails => ({
          ...prevDetails,
          [sha]: res.data,
        }));
        toggleCommit(sha); // Toggle the commit open state
      }).catch((err) => {
        console.error("Error fetching commit details:", err);
      });
    }
  };

  const handleContinue = () => {
    setChecked(true);
  };
  const handleGoBack = () => {
    setChecked(false);
  };
  
  const handleCheckBox = (repo,sha)=>{
    setSelectedCommit(sha)
    fetchCommitDetails(repo,sha)
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {!checked ? (
        <Box>



<Typography variant="question">Your Organizations</Typography>



{orgs ? ( <Organization orgs={orgs} setReposOrgParent={setRepos} setOrgNameParent={setOrgName}/>):
(   
  <Box sx={{mt:'30px' ,display:'grid',gap:3}}>
  <Typography variant="answer">Not seeing your organizations?</Typography>
  <Typography fontSize='16px' variant="answer"> Visit <a target='_blank' href='https://github.com/settings/installations'>here</a> and go to Authorized Oauth Apps to grant permission to the desired organizations</Typography>
    </Box> 
)}

      
        
          <Box sx={{ height: '150px' }}>
            <Box display='grid' sx={{ gap: 3, mt: '50px', justifyContent: 'center' }}>
              <Typography sx={{ textAlign: 'center', color: '#FFFFFF' }} fontSize="18px">Select a commit and click continue</Typography>
              
              <Button onClick={handleContinue} disabled={!selectedCommit} sx={{ color: '#0A0A0A', backgroundColor: selectedCommit ? '#00FF66' : "#252525" }}>
                <Typography sx={{ color: selectedCommit ? '#0A0A0A' : '#FFFFFF' }}>Continue</Typography>
              </Button>
            </Box>
          </Box>

   

          <Box sx={{color: '#FFFFFF',borderRadius:'15px', display: 'grid',
                gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)',lg: 'repeat(3,1fr)' },
                gap: 2,
                mt: 2, }} >
            {repos.map((repo) => (
              <Box sx={{cursor:'pointer'}} key={repo.id} onClick={() => fetchCommits(repo.name)}>
                <Box sx={{bgcolor:'#191919',padding: '16px',border: '1px solid rgb(52, 52, 52)',borderRadius: '16px 16px 16px 16px',minHeight:'120px'}}>
                  <Box display="flex">
                  <Box sx={{width:'30px',height:'30px'}}><img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Font_Awesome_5_brands_github.svg" alt="github" /></Box>
               <Box display='grid' sx={{ml:'10px'}}>
                <Typography variant="answer" sx={{ cursor: 'pointer',mb:'5px' }}>{repo.name}</Typography>
           
                <Typography sx={{ fontSize:'12px',color:'#777777' }}>{repo.language}</Typography>
                </Box>  
                </Box>
                <Box sx={{mt:'10px',display:'grid',gap:1}}>
                <Typography sx={{fontSize:'16px', color:'#CCCCCC'}}>{repo.description}</Typography>
                {repo.visibility == 'private' ?(
                  <Box display='flex'>
                    <LockIcon sx={{width:'12px',height:'12px'}}/>
                    <Typography  style={{ fontSize:'14px',color:'#CCCCCC'  }}>{repo.visibility}</Typography></Box>
                ):(
                  <Box display='flex'>
                  <PublicIcon sx={{width:'12px',height:'12px'}}/>
                  <Typography  style={{ fontSize:'14px',color:'#CCCCCC'  }}>{repo.visibility}</Typography></Box>
                )}
               
                
                <Typography fontSize="11px" fontWeight='600' sx={{ color: 'rgb(168, 168, 168)',textAlign: 'left'}} ><TimeSincePost createdAt={repo.updated_at} /> </Typography>
               <Link target="_blank" style={{textDecoration:'none'}} href={""}> <Typography sx={{fontSize:'12px', color:'#CCCCCC' ,cursor: 'pointer',whiteSpace:'nowrap',overflow:'hidden' }}>Go to github</Typography></Link>
                </Box>
                </Box>
              </Box>
            ))}
                     
          </Box>

          {selectedRepo && (
            <>
              <Typography sx={{mt:'50px'}} variant="answer">Commits for {selectedRepo}</Typography>
              <Box sx={{mt:'24px'}}>
                {commits.map((commit) => (
                  <Box key={commit.sha} sx={{ padding: 2, border: '1px solid rgb(52,52,52)', mb: 3, borderRadius: '16px', bgcolor:'#191919' }}>
                    <Box sx={{ color: '#FFFFFF' }}>
                      <Box display='flex' alignItems='center'>
                        <Checkbox
                          checked={selectedCommit === commit.sha}
                          onClick={() => handleCheckBox(selectedRepo,commit.sha)}
                          sx={{ color: '#FFFFFF' }}
                        />
                        <Typography variant="body1" onClick={() => fetchCommitDetails(selectedRepo, commit.sha)} style={{ cursor: 'pointer', marginLeft: '8px' }}>
                          {commit.commit.message} - {commit.commit.author.name}
                        </Typography>
                      </Box>
                      {openCommits[commit.sha] && commitDetails[commit.sha] && (
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                          {commitDetails[commit.sha].files.map(file => (
                            <Box key={file.filename} sx={{ overflow: 'hidden' }}>
                              <Typography variant='body2'>{file.filename}</Typography>
                              <SyntaxHighlighter language='diff' style={atomDark}>
                                {file.patch}
                              </SyntaxHighlighter>
                            </Box>
                          ))}
                        </pre>
                      )}
                    </Box>
                  </Box>
                ))}
                  <PaginationRounded onPageChange={handlePageChange} totalPages={totalPages}/>
              </Box>
            </>
          )}
        </Box>
      ) : (
        <Box>
        <Button onClick={handleGoBack}>
        <Typography variant="question"><ArrowBackIcon/></Typography>
        </Button>

      <CreateBlog commitDetails={commitDetails[selectedCommit]} commitMsg={commitDetails[selectedCommit].commit.message}/>
      </Box>
      )}
    </Container>
  );
}
