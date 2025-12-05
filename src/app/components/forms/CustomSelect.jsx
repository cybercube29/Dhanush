'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';

const CustomSelect = styled((props) => <Select {...props} />)(({ theme }) => ({
  '& .MuiSelect-select': {
    padding: '5.5px 10px',
    borderRadius: '4px',
  },
  '& fieldset': {
    borderRadius: '4px',
  },
}));

export default CustomSelect;