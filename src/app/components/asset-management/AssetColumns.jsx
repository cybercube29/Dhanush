import { Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';

const columnHelper = createColumnHelper();

export const getAssetColumns = (toggleAddScanModal, handleEdit, handleDelete) => [
  columnHelper.accessor('sno', {
    header: () => 'S.No',
    cell: info => (
      <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
        {info.row.index + 1}
      </Typography>
    ),
  }),
  columnHelper.accessor('profileName', {
    header: () => 'Profile Name',
    cell: info => {
      const cloudCategory = info.row.original.cloudType;
      const asset = info.row.original.profileName;
      return (
        <Link href={`/asset-management/cloud-scan?cloud=${cloudCategory}&asset=${asset}`}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
            {info.getValue()}
          </Typography>
        </Link>
      );
    },
  }),
  columnHelper.accessor('remark', {
    header: () => 'Remark',
    cell: info => (
      <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
        {info.getValue()}
      </Typography>
    ),
  }),
  columnHelper.accessor('entryDate', {
    header: () => 'Entry Date',
    cell: info => (
      <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
        {info.getValue()}
      </Typography>
    ),
  }),
  columnHelper.accessor('status', {
    header: () => 'Status',
    cell: info => (
      <Chip
        size="small"
        label={info?.getValue()?.toUpperCase()}
        sx={{
          fontSize: '.55rem',
          padding: '.1rem',
          bgcolor:
            info.getValue() === 'ACTIVE'
              ? (theme) => theme.palette.success.light
              : info.getValue() === 'INACTIVE'
                ? (theme) => theme.palette.error.light
                : (theme) => theme.palette.secondary.light,
          color:
            info.getValue() === 'ACTIVE'
              ? (theme) => theme.palette.success.main
              : info.getValue() === 'INACTIVE'
                ? (theme) => theme.palette.error.main
                : (theme) => theme.palette.secondary.main,
          borderRadius: '2px',
        }}
      />
    ),
  }),
  columnHelper.accessor('result', {
    header: () => 'Result',
    cell: info => {
      const { cloudType, profileName } = info.row.original;
      return (
        <Link href={`/asset-management/cloud-scan?cloud=${cloudType}&asset=${profileName}`}>
          <Button
            size="small"
            variant="outlined"
            sx={{ fontSize: '.6rem', padding: '0rem .4rem', height: '22px', textTransform: 'none' }}
          >
            View Scan
          </Button>
        </Link>
      );
    },
  }),
  {
    id: 'actions',
    header: () => 'Actions',
    cell: info => {
      return (
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            size="small"
            variant="outlined"
            sx={{ fontSize: '.6rem', padding: '0rem .4rem', height: '22px', textTransform: 'none' }}
            onClick={() => toggleAddScanModal(info.row.original)}
          >
            Add Scan
          </Button>
          <IconButton size="small" color="primary" onClick={() => handleEdit(info.row.original)}>
            <IconEdit size={14} />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(info.row.original)}>
            <IconTrash size={14} />
          </IconButton>
        </Stack>
      );
    },
  },
];