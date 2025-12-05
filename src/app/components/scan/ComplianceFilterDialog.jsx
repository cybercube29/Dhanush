import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import { useState } from 'react';

export default function ComplianceFilterDialog({
  complianceFilterDialog,
  toggleComplianceFilterDialog,
  heatmapData = [],
  onApply
}) {
  const complianceData = heatmapData.filter(d => d.frameworkType === 'compliance');
  const allFrameworks = complianceData.map(d => d.frameworkName);
  const [selectedItems, setSelectedItems] = useState([]);

  const isAllSelected = selectedItems.length === allFrameworks.length;

  const toggleAll = () => {
    setSelectedItems(isAllSelected ? [] : allFrameworks);
  };

  const handleToggle = (name) => {
    setSelectedItems((prev) =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const handleApply = () => {
    onApply(selectedItems);
    toggleComplianceFilterDialog();
  };

  return (
    <Dialog
      open={complianceFilterDialog}
      onClose={toggleComplianceFilterDialog}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Filter Compliance Heatmap</DialogTitle>
      <DialogContent dividers>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAllSelected}
                onChange={toggleAll}
              />
            }
            label="All"
          />
          <Divider sx={{ my: 1 }} />
          {allFrameworks.map((name, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedItems.includes(name)}
                  onChange={() => handleToggle(name)}
                />
              }
              label={name}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleComplianceFilterDialog}>Cancel</Button>
        <Button
          onClick={handleApply}
          variant="contained"
          disabled={selectedItems.length === 0}
        >
          Filter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
