import React from "react";
import { Box, Stack, Typography, Button, Container, Link, TextField, Alert, LinearProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import { UserService } from "../service/Service";
import AuthLayout from "../layouts/AuthLayout";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions";

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [employeeID, setEmployeeID] = React.useState("");
    const [name, setName] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    async function isValid() {
        let errors = {};
        if (!employeeID) {
            errors.employeeID = "Employee ID is required";
        } else if (isNaN(employeeID)) {
            errors.employeeID = "Employee ID must be a number";
        }
        if (!name) {
            errors.name = "Name is required";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    function submit(event) {
        event.preventDefault();
        setError(null);
        if (isValid()) {
            setLoading(true);
            UserService.getByField("EmployeeID", Number(employeeID))
                .then(data => {
                    if (data.length) {
                        setLoading(false);
                        setError("Employee ID is already registered");
                    } else {
                        UserService.create({
                            EmployeeID: Number(employeeID),
                            Name: name
                        }).then(data => {
                            console.log(data);
                            dispatch(setUser(data));
                            setLoading(false);
                            navigate("/hack/list");
                        }).catch(err => {
                            setLoading(false);
                            console.error(err);
                            setError("We are unable to register at this time. Please try again later.");
                        });
                    }
                })
                .catch(err => {
                    setLoading(false);
                    console.error(err)
                });
        }
    };

    return (
        <Box data-testid="signup-form">
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
                    {error && <Box sx={{ width: '100%' }} mb={2}>
                        <Alert severity="error">{error}</Alert>
                    </Box>}
                    <form onSubmit={submit}>
                        <Stack spacing={3}>
                            <TextField
                                id="employeeID"
                                value={employeeID}
                                variant="outlined"
                                label="Employee ID"
                                onChange={(event) => setEmployeeID(event.target.value)}
                                error={!!errors.employeeID}
                                helperText={errors.employeeID}
                            />
                            <TextField
                                id="name"
                                value={name}
                                variant="outlined"
                                label="Name"
                                onChange={(event) => setName(event.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            {loading && <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>}
                            <Button
                                id="submit"
                                variant="contained"
                                color="primary"
                                type="submit"
                                data-testid="signup-submit"
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </ContentStyle>
            </Container>
        </Box>
    )
}

export default SignUp;