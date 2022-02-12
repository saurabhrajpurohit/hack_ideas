import { useRef, useState } from 'react';
import { Avatar, Box, Button, Divider, IconButton, Popover, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { green } from '@mui/material/colors';

export default function Account({ account = { name: "Saurabh", employeeID: "1001" } }) {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    width: 44,
                    height: 44,
                }}
            >
                <Avatar sx={{ bgcolor: green[500] }}>
                    <PersonIcon />
                </Avatar>
            </IconButton>
            <Popover
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                anchorEl={anchorRef.current}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        ml: 0.5,
                        overflow: 'inherit',
                        border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
                        width: 220
                    }
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle1" noWrap>
                        {account.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        Emp. ID: {account.employeeID}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />
                <Box sx={{ p: 2, pt: 1.5 }}>
                    <Button href="/" fullWidth color="inherit" variant="outlined">
                        Logout
                    </Button>
                </Box>
            </Popover>
        </>
    );
}
