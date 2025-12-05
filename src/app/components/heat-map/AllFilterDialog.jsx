import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    FormGroup,
} from "@mui/material";
import { useState } from "react";

export default function AllFilterDialog({
    open,
    toggleDialog,
    heatmapData = [],
    onApply,
}) {
    const allFrameworks = heatmapData.map((d) => d.frameworkName);
    const [selectedItems, setSelectedItems] = useState([]);

    const isAllSelected = selectedItems.length === allFrameworks.length;

    const toggleAll = () => {
        setSelectedItems(isAllSelected ? [] : allFrameworks);
    };

    const handleToggle = (name) => {
        setSelectedItems((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name]
        );
    };

    const handleApply = () => {
        onApply(selectedItems.length === 0 ? "ALL" : selectedItems);
        toggleDialog();
    };

    return (
        <Dialog open={open} onClose={toggleDialog} maxWidth="xs" fullWidth>
            <DialogTitle>Filter Heatmap</DialogTitle>
            <DialogContent dividers>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={isAllSelected} onChange={toggleAll} />}
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
                <Button onClick={toggleDialog}>Cancel</Button>
                <Button
                    onClick={handleApply}
                    variant="contained"
                    disabled={selectedItems.length === 0}
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
}
