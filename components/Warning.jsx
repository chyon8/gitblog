import { Box, Modal, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useState } from 'react';

function Warning({open,setOpen,handleCancel}) 
{
  const handleClose = () => setOpen(true);
  const [processing,setProcessing]=useState(false)


  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          display: 'grid',
          top: '50%',
          left: '50%',
          boxSizing: 'border-box',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgb(52, 52, 52)',
          borderRadius: '16px',
          background: 'rgb(27, 27, 27)',
          width: '300px',
          height: '178px',
          outline: 'none',
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <CloseIcon
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', top: 12, left: 272, width: '12', height: '12', color:'#FFFFFF' }}
          />
        </Box>
        <Box sx={{ alignContent: 'center', justifyContent: 'center', display: 'grid' }}>
          <Box sx={{ mt: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <WarningAmberIcon sx={{color:'#FFFFFF'}} />
          </Box>
          <Box sx={{pl:1,pr:1}}>
          <Typography fontSize='13px' sx={{ mt: '16px', color:'#FFFFFF' }} textAlign="center">
          Sure you want to cancel your subscription?
          </Typography>
          <Typography fontSize='13px' sx={{ mt: '10px', color:'#FFFFFF' }} textAlign="center">
          Even though your subscription has been canceled
          </Typography>
          <Typography fontSize='13px' sx={{ mt: '5px', mb: '14px', color: '#FFFFFF', textAlign: 'center' }}>
      you still have{' '}
      <span style={{ color: '#00FF66' }}>300 credits</span> available for use!
    </Typography>
          </Box>
          {processing && (<Typography fontSize='11px' sx={{ color:'#00FF66', mb: '24px' }} textAlign="center">
            Canceling the subscription...
          </Typography>)}
          

        </Box>
        <Box sx={{ pl: '8px', pr: '8px', pb: '16px' }}>
          {!processing && (     <Button
            onClick={() =>{ 
              setProcessing(true)
              handleCancel()
            }}
            fullWidth
            sx={{
              height: '30px',
              color:'#0A0A0A',
            backgroundColor: '#00FF66',
            }}
          >
            <Typography>Cancel</Typography>
          </Button>)}
    
        </Box>
      </Box>
    </Modal>
  );
}

export default Warning;
