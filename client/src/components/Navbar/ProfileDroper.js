import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { AiOutlineUser } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { FiShoppingBag, FiSettings } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../actions/userActions';
import { cleanCart } from '../../actions/cartAction';

const ProfileDroper = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        if (localStorage.getItem('userName') !== null) {
            setOpen((prevOpen) => !prevOpen);
        }
    };

    const handleClose = (event, name) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);

    const logout = () => {
        dispatch(userLogout());
        dispatch(cleanCart());
        navigate('/')
    }

    let userName = localStorage.getItem('userName')
    let userEmail = localStorage.getItem('userEmail')

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2} className="profileDroper">
            <div>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    variant="contained"
                    size='small'
                >
                    <AiOutlineUser />
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                    sx={{
                        zIndex: 2,
                        paddingTop: '.5rem'
                    }}
                    className='menues-nav'
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                {userName !== null && <div className='userinfo'>
                                    <p>{userName.charAt(0).toUpperCase() + userName.slice(1)}</p>
                                    <p>{userEmail}</p>
                                </div>}
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                        className="dropdownMenue"
                                    >
                                        <Divider />
                                        <MenuItem
                                            className='dropperItemsMenu'
                                            onClick={(e) => {
                                                handleClose(e)
                                                navigate('/myprofile')
                                            }}
                                        >
                                            <FiSettings />
                                            Setting
                                        </MenuItem>
                                        <MenuItem
                                            className='dropperItemsMenu'
                                            onClick={(e) => {
                                                handleClose(e)
                                                navigate('/myorders')
                                            }}>
                                            <FiShoppingBag />
                                            My Orders
                                        </MenuItem>
                                        <MenuItem
                                            className='dropperItemsMenuHelp'
                                            onClick={(e) => {
                                                handleClose(e)
                                                navigate('/contact')
                                            }}>
                                            <BiSupport />
                                            Contact Us
                                        </MenuItem>
                                        <MenuItem
                                            sx={{ color: "red !important" }}
                                            onClick={(e) => {
                                                handleClose(e);
                                                logout();
                                            }}
                                        >
                                            <IoMdLogOut style={{ color: "red" }} />
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    )
}

export default ProfileDroper
