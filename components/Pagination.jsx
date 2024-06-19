"use client"


import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import { useState } from 'react';

export default function PaginationRounded({onPageChange,totalPages}) {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
      setPage(value);
      onPageChange(value);
    };

  return (
    <Box spacing={2}>
<Pagination count={totalPages} size="large" onChange={handleChange} />
    </Box>
  );
}