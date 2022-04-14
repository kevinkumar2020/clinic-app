import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';

import CssBaseline from '@mui/material/CssBaseline';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';

import { getAppoinments, appoveAppoinmet, deleteAppoinment } from '../../Redux/Action/generalAction';

import DataTable from '../../../UI/Table/DataTable';

const Appoinment = () => {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [deleteOpen, setDeleteOpen] = useState(false);

    const { appoinments } = useSelector((state) => state.allDetailStore);

    const handleDeleteOpen = (e) => { setId(e.id); setDeleteOpen(true); };

    const handleDeleteClose = () => { setDeleteOpen(false); };

    const handleApprove = (e) => {
        const id = e.id;
        if (id !== "") {
            dispatch(appoveAppoinmet(id));
            message.success("Approve Appoinment");
        }
    }

    const handleDelete = () => {
        if (id !== "") {
            dispatch(deleteAppoinment(id));
            message.success("Delete Appoinment .")
            setDeleteOpen(false);
        }
    }

    useEffect(() => {
        dispatch(getAppoinments());
    }, [dispatch])

    const columns = [
        {
            field: 'id', headerName: 'ID', width: "100",
            renderCell: (params) => {
                return (
                    <>
                        {params.api.getRowIndex(params.row._id) + 1}
                    </>
                );
            }
        },
        {
            field: 'name',
            headerName: 'Patient Name',
            width: "350",
            renderCell: (params) => {
                return params?.row?.patientId?.name
            }
        },
        {
            field: 'age',
            headerName: 'Age',
            width: "100",
            renderCell: (params) => {
                return params?.row?.patientId?.age
            }
        },
        { field: 'reason', headerName: 'Reason', width: "350" },
        { field: 'appoinment_date', headerName: 'Appoinment Date', width: "200", renderCell: (params) => { return moment(params.row.appoinment_date).format('L') } },
        {
            field: 'status',
            headerName: 'Status',
            width: "220",
            renderCell: (params) => params?.row?.status ? <Button variant="contained" disabled >Approve</Button> : <Button variant="contained" onClick={() => handleApprove(params)} >Approve</Button>
        },
        {
            field: 'action', headerName: 'Action', with: "170", sortable: false, disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="delete" size="large" color="error" onClick={() => handleDeleteOpen(params)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                );
            }
        },
    ];

    return (

        <React.Fragment>
            {/* conformation dialog */}
            <Dialog open={deleteOpen}>
                <DialogTitle>Alert</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <IconButton aria-label="delete" size="large" color="error">
                            <ErrorIcon />
                        </IconButton>
                        Are You Sure You Want To Delete ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Conform</Button>
                </DialogActions>
            </Dialog>

            <CssBaseline />
            <DataTable title="Appoinemt List" buttonName="" mainData={appoinments} columns={columns} handleAddOpen="" loading="" />
        </React.Fragment>
    );
}

export default Appoinment;