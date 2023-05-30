import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { GrFormClose } from "react-icons/gr";
import Typography from '@mui/material/Typography';
import "./MUI.css"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <GrFormClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const PopupModal = ({ open, handleClose, data }) => {
    let date = new Date(data.orderPlaced);
    date = date.toString().split(" ");
    let newdate = `${date[1]} ${date[2]}, ${date[3]}`;
    return (
        <div className='POPUP'>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    ORDER DETAILS
                </BootstrapDialogTitle>
                <DialogContent dividers className='orderDetails'>
                    <Typography gutterBottom className='orderDetails1'>
                        Ordered Date : <span>{newdate}</span>
                    </Typography>
                    <Typography gutterBottom className='orderDetails2'>
                        Payment Method : <span>{data.paymentMethod}</span>
                    </Typography>
                    <Typography gutterBottom className='orderDetails3'>
                        Address :
                        <span>
                            {data.userInfo.address.city}
                            {data.userInfo.address.state !== "" ? `, ${data.userInfo.address.state}` : ""}
                            {` - ${data.userInfo.address.pincode}`}
                            <br />
                            {data.userInfo.address.landmark}<br />
                            {data.userInfo.address.address !== "" ? <>{data.userInfo.address.address}<br /></> : ""}
                            {data.userInfo.address.house_flat_no !== "" ? data.userInfo.address.house_flat_no : ""}
                        </span>
                    </Typography>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
export default PopupModal