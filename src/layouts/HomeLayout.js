import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import HomeNavbar from './HomeNavbar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router";

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: 92,
    paddingBottom: theme.spacing(10),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
}));

export default function HomeLayout() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if(!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <RootStyle>
            <HomeNavbar />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    );
}
