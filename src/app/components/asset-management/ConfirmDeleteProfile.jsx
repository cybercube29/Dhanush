'use client';

import { Button, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';

export default function ConfirmDeleteProfile({
  onConfirm,
  toastId,
  message = "Are you sure you want to delete this data?"
}) {
  return (
    <div>
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          textAlign: 'center',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {message}
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => {
            onConfirm();
            toast.dismiss(toastId);
          }}
          sx={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Confirm
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => toast.dismiss(toastId)}
          sx={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
