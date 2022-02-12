import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar } from '@mui/material';
import Account from './Account';
import Logo from '../components/Logo';

const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default),
}));

export default function HomeNavbar() {
    return (
        <RootStyle>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Logo />
                </Box>
                <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                    <Account />
                </Stack>
            </Toolbar>
        </RootStyle>
    );
}
