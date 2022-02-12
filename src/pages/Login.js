import React from "react";
import { Box, Stack, Typography, Button, Container, Link, TextField, Alert } from "@mui/material";
import { styled } from '@mui/material/styles';
import { UserService } from "../service/Service";
import AuthLayout from "../layouts/AuthLayout";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

const Login = () => {
    const navigate = useNavigate();
    const [employeeID, setEmployeeID] = React.useState("");

    const submit = (event) => {
        event.preventDefault();
        UserService.getByField("EmployeeID", employeeID).then(data => {
            console.log(data)
            navigate("/home/hacks");
        });
    }

    return (
        <Box>
            <AuthLayout>
                Don’t have an account? &nbsp;
                <Link underline="none" variant="subtitle2" component={RouterLink} to="/signup">
                    Get started
                </Link>
            </AuthLayout>
            <Container maxWidth="sm">
                <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                            Sign in to Hack- Ideas
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Enter your Employee ID below.</Typography>
                    </Stack>
                    <Box mb={2}>
                        <Alert severity="info">Use Employee ID: <strong>1001</strong></Alert>
                    </Box>
                    <form onSubmit={submit}>
                        <Stack spacing={3}>
                            <TextField id="employeeID" value={employeeID} variant="outlined" label="Employee ID" required onChange={(event) => setEmployeeID(event.target.value)} />
                            <Button id="submit" variant="contained" color="primary" type="submit">Login</Button>
                        </Stack>
                    </form>

                </ContentStyle>
            </Container>
        </Box>
    )
}

export default Login;