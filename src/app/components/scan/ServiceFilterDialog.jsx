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

export default function ServiceFilterDialog({
    servicesFilterDialog,
    toggleServicesFilterDialog,
    heatmapData = [],
    onApply
}) {
    const [selectedServices, setSelectedServices] = useState([]);
    const allFrameworks = heatmapData.map(d => d.frameworkName);

    const isAllSelected = selectedServices.length === allFrameworks.length;

    const toggleAll = () => {
        setSelectedServices(isAllSelected ? [] : allFrameworks);
    };

    const handleToggle = (name) => {
        setSelectedServices((prev) =>
            prev.includes(name)
                ? prev.filter(item => item !== name)
                : [...prev, name]
        );
    };

    const handleApply = () => {
        onApply(selectedServices);
        toggleServicesFilterDialog();
    };

    return (
        <Dialog
            open={servicesFilterDialog}
            onClose={toggleServicesFilterDialog}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>Filter by Service</DialogTitle>
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
                                    checked={selectedServices.includes(name)}
                                    onChange={() => handleToggle(name)}
                                />
                            }
                            label={name}
                        />
                    ))}
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleServicesFilterDialog}>Cancel</Button>
                <Button
                    onClick={handleApply}
                    variant="contained"
                    disabled={selectedServices.length === 0}
                >
                    Filter
                </Button>
            </DialogActions>
        </Dialog>
    );
}