import { Button, Chip, IconButton, Stack, Typography } from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const getCloudConnectionColumns = (handleEdit, handleDelete) => [
    columnHelper.accessor("sno", {
        header: "S.No",
        cell: (info) => (
            <Typography variant="subtitle2">{info.row.index + 1}</Typography>
        ),
    }),
    columnHelper.accessor("connectionName", {
        header: "Connection Name",
        cell: (info) => (
            <Typography variant="subtitle2" color="textSecondary">
                {info.getValue()}
            </Typography>
        ),
    }),
    columnHelper.accessor("remark", {
        header: "Remark",
        cell: (info) => (
            <Typography variant="subtitle2" color="textSecondary">
                {info.getValue()}
            </Typography>
        ),
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
            <Chip
                size="small"
                label={info?.getValue()?.toUpperCase()}
                sx={{
                    fontSize: ".65rem",
                    bgcolor:
                        info.getValue() === "ACTIVE"
                            ? (t) => t.palette.success.light
                            : (t) => t.palette.error.light,
                    color:
                        info.getValue() === "ACTIVE"
                            ? (t) => t.palette.success.main
                            : (t) => t.palette.error.main,
                }}
            />
        ),
    }),
    {
        id: "actions",
        header: "Actions",
        cell: (info) => (
            <Stack direction="row" spacing={1}>
                <IconButton size="small" color="primary" onClick={() => handleEdit(info.row.original)}>
                    <IconEdit size={14} />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDelete(info.row.original)}>
                    <IconTrash size={14} />
                </IconButton>
            </Stack>
        ),
    },
];
