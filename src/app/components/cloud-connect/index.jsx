"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Stack } from "@mui/material";

import { getCloudProfileList } from "@/store/allCloudProfileList/thunk";
import { DeleteCloudProfileAPI } from "@/axios/apis";

import CloudConnectionList from "./CloudConnectionList";
import { getCloudConnectionColumns } from "./CloudConnectionColumns";
import AddCloudConnectionForm from "./AddCloudConnectionForm";
import { TableSkeleton } from "../shared/TableSkeleton";

export default function CloudConnection() {
    const dispatch = useDispatch();
    const { data: userDetails } = useSelector((s) => s.UserDetails);
    const { data, isLoading, isLoaded } = useSelector((s) => s.CloudProfilesList);

    // initial load
    useEffect(() => {
        if (!isLoaded && userDetails?.clientCompanyId) {
            dispatch(getCloudProfileList(userDetails.clientCompanyId));
        }
    }, [isLoaded, userDetails, dispatch]);

    // state
    const [addDialog, setAddDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [selected, setSelected] = useState(null);

    // toggle add
    const toggleAddDialog = (provider) => {
        setSelected(provider);
        setAddDialog(!addDialog);
    };

    // toggle edit
    const toggleEditDialog = (item) => {
        setSelected(item);
        setEditDialog(!editDialog);
    };

    // delete
    const handleDelete = (item) => {
        toast.dismiss();
        toast(
            (t) => (
                <ConfirmDeleteProfile
                    toastId={t.id}
                    onConfirm={async () => {
                        try {
                            const res = await DeleteCloudProfileAPI(item.id);
                            if (res.status === 200) {
                                toast.success(res.data);
                                dispatch(getCloudProfileList(userDetails?.clientCompanyId));
                            } else {
                                toast.error(res.data || "Failed to delete");
                            }
                        } catch (err) {
                            console.error(err);
                            toast.error("Error deleting connection");
                        }
                    }}
                />
            ),
            { duration: Infinity }
        );
    };

    // table columns
    const columns = getCloudConnectionColumns(toggleEditDialog, handleDelete);

    // skeleton while loading
    if (isLoading) {
        return (
            <Stack gap={1}>
                <TableSkeleton rows={3} />
            </Stack>
        );
    }

    return (
        <Stack gap={2}>
            {/* Top grid for selecting provider */}
            <CloudConnectionList toggleAddDialog={toggleAddDialog} />

            {/* Add connection dialog */}
            {addDialog && (
                <AddCloudConnectionForm
                    open={addDialog}
                    onClose={() => setAddDialog(false)}
                    selectedProvider={selected}
                    onSuccess={() => dispatch(getCloudProfileList(userDetails?.clientCompanyId))}
                />
            )}

        </Stack>
    );
}
