import { AddScanAPI } from '@/axios/apis';
import { getCloudServicesList } from '@/store/allCloudServicesList/thunk';
import {
  Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogTitle,
  IconButton, List, ListItem, ListItemIcon, ListItemText,
  Stack, TextField, Typography
} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../shared/Loader';

const SelectServicesDialog = ({ open, onClose, assetId }) => {
  const dispatch = useDispatch();
  const { isLoading, isLoaded, data: services } = useSelector(state => state.CloudServicesList);

  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch service list only once
  useEffect(() => {
    if (!isLoaded) {
      dispatch(getCloudServicesList());
    }
  }, [dispatch, isLoaded]);

  const filteredServices = services.filter(service =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAllSelected = filteredServices.length > 0 && filteredServices.every(item => selected.includes(item));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected(prev => prev.filter(item => !filteredServices.includes(item)));
    } else {
      setSelected(prev => Array.from(new Set([...prev, ...filteredServices])));
    }
  };

  const toggleSelectItem = (item) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmitScan = async () => {
    setLoading(true);
    try {
      const payload = { aid: assetId, categories: selected.join(',') };
      const response = await AddScanAPI(payload);

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data);
        onClose();
        //relode the page afte 1.5 sec
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error in scan", error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontSize={14}>Select Services For Add Scan</Typography>
          <IconButton onClick={onClose} size="small"><IconX size={14} /></IconButton>
        </Box>
      </DialogTitle>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search services…"
          sx={{ mb: 1 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Stack direction="row" alignItems="center">
          <Checkbox
            size="small"
            checked={isAllSelected}
            onChange={toggleSelectAll}
          />
          <Typography variant="subtitle2" fontWeight={600}>Select All</Typography>
        </Stack>

        <Box sx={{ height: 300, overflowY: 'scroll' }}>
          <List>
            {filteredServices.map((item, idx) => (
              <ListItem
                key={idx}
                sx={{ px: 0, py: 0.25, minHeight: 30, cursor: 'pointer' }}
                onClick={() => toggleSelectItem(item)}
              >
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <Checkbox
                    size="small"
                    sx={{ py: 0.5 }}
                    checked={selected.includes(item)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="subtitle2">{item.toUpperCase()}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <DialogActions sx={{ px: 2, py: 1 }}>
          <Button onClick={onClose} color="error" size="small">Cancel</Button>
          {loading ? (
            <CircularProgress size={'25px'} />
          ) : (
            <Button
              color="primary"
              size="small"
              onClick={handleSubmitScan}
              disabled={selected.length === 0 || loading}
            >
              Scan
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default SelectServicesDialog;