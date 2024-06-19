import { Box, Modal, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

function Warning({open,setOpen,handleDelete,}) 
{
  const handleClose = () => setOpen(true);

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
          <Typography sx={{ mt: '16px', mb: '24px', color:'#FFFFFF' }} textAlign="center">
            삭제하시겠습니까?
          </Typography>
        </Box>
        <Box sx={{ pl: '8px', pr: '8px', pb: '16px' }}>
          <Button
            onClick={() => handleDelete()}
            fullWidth
            sx={{
              height: '30px',
              color:'#0A0A0A',
            backgroundColor: '#00FF66',
            }}
          >
            <Typography>삭제</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default Warning;
