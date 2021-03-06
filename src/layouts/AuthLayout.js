import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Logo from '../components/Logo';

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between'
}));

AuthLayout.propTypes = {
    children: PropTypes.node
};

export default function AuthLayout({ children }) {
    return (
        <HeaderStyle>
            <RouterLink to="/">
                <Logo />
            </RouterLink>

            <Typography
                variant="body2"
                sx={{
                    mt: { md: -2 }
                }}
            >
                {children}
            </Typography>
        </HeaderStyle>
    );
}
