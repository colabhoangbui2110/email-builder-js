import React, { useState } from 'react';

import { ImageOutlined, DeleteOutline } from '@mui/icons-material';
import { InputLabel, Stack, TextField, Button, Box } from '@mui/material';

type Props = {
  label: string;
  defaultValue: string | null;
  onChange: (value: string | null) => void;
};

export default function BackgroundImageInput({ label, defaultValue, onChange }: Props) {
  const [value, setValue] = useState(defaultValue || '');
  
  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue || null);
  };

  const handleClear = () => {
    setValue('');
    onChange(null);
  };

  return (
    <Stack spacing={1} alignItems="flex-start" width="100%">
      <InputLabel shrink>{label}</InputLabel>
      <Stack direction="row" spacing={1} width="100%" alignItems="center">
        <TextField
          fullWidth
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter image URL"
          size="small"
          InputProps={{
            startAdornment: <ImageOutlined sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />,
          }}
        />
        {value && (
          <Button 
            variant="outlined" 
            color="error" 
            size="small" 
            onClick={handleClear}
            sx={{ minWidth: 'auto', p: '4px' }}
          >
            <DeleteOutline fontSize="small" />
          </Button>
        )}
      </Stack>
      {value && (
        <Box 
          sx={{ 
            mt: 1, 
            width: '100%', 
            height: 80, 
            backgroundImage: `url(${value})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 1
          }} 
        />
      )}
    </Stack>
  );
}