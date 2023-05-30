import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import "./Dropdown.css"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Dropdown = (props) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const categories = [
        {
            name: "All Products"
        },
        {
            name: "Women Collection"
        },
        {
            name: "Men Collection"
        },
        {
            name: "Upper Wear"
        },
        {
            name: "Bottom Wear"
        },
        {
            name: "Foot Wear"
        },
        {
            name: "Accessories"
        },
        {
            name: "Ornaments"
        },
        {
            name: "Jeans"
        }
    ]

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event, name) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        if (name === undefined) {
            props.setCatOption("All Products");
        } else {
            props.setCatOption(name);
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
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2} className="dropdownCat">
            <div>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    variant="contained"
                    color='success'
                    size='small'
                >
                    {props.catOption} {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
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
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                        className="dropdownMenue"
                                    >
                                        {categories.filter(item => {
                                            return item.name !== props.catOption
                                        }).map((item, index) => {
                                            return (
                                                <MenuItem key={index} onClick={e => handleClose(e, item.name)}>{item.name}</MenuItem>
                                            )
                                        })}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}
export default Dropdown;