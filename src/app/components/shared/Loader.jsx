"use client";

import { Box, CircularProgress, Dialog } from '@mui/material';
import { useState } from 'react';

export default function Loader() {

    const [editCustomerDialog, setEditCustomerDialog] = useState(true);

    return (
        <>
            <Dialog open={editCustomerDialog} onClose={() => setEditCustomerDialog(true)}>
                <Box sx={{ py: 1, px: 2 }}>
                    <CircularProgress />
                </Box>
            </Dialog>
        </>
    )
}
