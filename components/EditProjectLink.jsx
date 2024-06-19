"use client"

import { Box, Modal, Typography, Button, Input } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import BASE_URL from '@/app/config';
import { typography } from '@/app/themeValue';



function EditProjectLink({
  open,
  setOpen,
  productId,
  socialType
}) {
  const [formData, setFormData] = useState({
    name: '',
    productId,
  });
  const [error, setError] = useState(null);
  const handleClose = () => setOpen(true);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/api/edit/${socialType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
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
  };

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
            borderBottom: '1px solid rgb(52, 52, 52)',
          }}
        >
          <Typography
            fontSize={typography.size.lg}
            fontWeight={typography.weight.bold}
            sx={{ mt: '10px', mb: '10px',color:'#FFFFFF' }}
            textAlign="center"
          >
            링크 수정
          </Typography>
          <CloseIcon
            onClick={() => setOpen(false)}
            sx={{ color:"#FFFFFF" ,position: 'absolute', top: 12, left: 272, width: '12', height: '12' }}
          />
        </Box>
        <Box sx={{ alignContent: 'center', justifyContent: 'center', pl: '16px', pr: '16px' }}>
          <Box sx={{ mt: '16px' }}>
            <Input name="name" 
            value={formData.name} 
            
            onChange={handleChange} fullWidth placeholder="링크 입력" />
            {error && (
              <Box className="error-message">
                <Typography
                  textAlign="left"
                  fontSize="fontSizeMd"
                  fontWeight="fontWeightRegular"
                  sx={{
                    mt: '10px',
                    ml: '8px',
                    color: '#00FF66',
                  }}
                >
                  *{error}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ pl: '8px', pr: '8px', pb: '16px' }}>
          <Button
            onClick={handleSubmit}
            fullWidth
            sx={{
              height: '30px',
              color:"#0A0A0A",
              bgcolor:'#00FF66',
              mt: '16px',
            }}
          >
            <Typography fontSize={typography.size.md} fontWeight={typography.weight.medium}>
              저장
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditProjectLink;
