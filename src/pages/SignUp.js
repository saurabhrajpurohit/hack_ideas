import React from "react";
import { Box, Stack, Typography, Button, Container, Link, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { UserService } from "../service/Service";
import AuthLayout from "../layouts/AuthLayout";
import { Link as RouterLink } from 'react-router-dom';

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

const SignUp = () => {
    const [employeeID, setEmployeeID] = React.useState("");
    const [name, setName] = React.useState("");

    const submit = (event) => {
        event.preventDefault();
        UserService.getByField("EmployeeID", employeeID).then(data => console.log(data));
    }

    return (
        <Box>
            <AuthLayout>
                Already have an account? &nbsp;
                <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
                    Login
                </Link>
            </AuthLayout>
            <Container maxWidth="sm">
                <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                            Get Started
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                    </Stack>

                    <form onSubmit={submit}>
                        <Stack spacing={3}>
                            <TextField id="employeeID" value={employeeID} variant="outlined" label="Employee ID" required onChange={(event) => setEmployeeID(event.target.value)} />
                            <TextField id="name" value={name} variant="outlined" label="Name" required onChange={(event) => setName(event.target.value)} />
                            <Button id="submit" variant="contained" color="primary" type="submit">Sign Up</Button>
                        </Stack>
                    </form>

                </ContentStyle>
            </Container>
        </Box>
    )
}

export default SignUp;