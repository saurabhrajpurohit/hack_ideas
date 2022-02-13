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

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [employeeID, setEmployeeID] = React.useState("");
    const [fieldError, setFieldError] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    function isValid() {
        if (!employeeID) {
            setFieldError("Employee ID is required");
            return false;
        } else if (isNaN(employeeID)) {
            setFieldError("Employee ID must be a number");
            return false;
        }
        return true;
    };

    function submit(event) {
        event.preventDefault();
        if (isValid()) {
            setLoading(true);
            UserService.getByField("EmployeeID", Number(employeeID)).then(data => {
                setLoading(false);
                console.log(data);
                if (data.length) {
                    dispatch(setUser(data[0]));
                    navigate("/hack/list");
                } else {
                    setError("Employee ID is not registered in our system.");
                }
            }).catch(err => {
                setLoading(false);
                console.error(err);
                setError("We are unable to login at this time. Please try again later.");
            });
        }
    };

    return (
        <Box data-testid="login-form">
            <AuthLayout>
                Don’t have an account? &nbsp;
                <Link
                    underline="none"
                    variant="subtitle2"
                    component={RouterLink}
                    to="/signup"
                >
                    Get started
                </Link>
            </AuthLayout>
            <Container maxWidth="sm">
                <ContentStyle>
                    <form onSubmit={submit}>
                        <Stack sx={{ mb: 5 }}>
                            <Typography variant="h4" gutterBottom>
                                Sign in to Hack- Ideas
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Enter your Employee ID below.
                            </Typography>
                        </Stack>
                        {error && <Box sx={{ width: '100%' }} mb={1}>
                            <Alert severity="error">{error}</Alert>
                        </Box>}
                        <Box mb={2}>
                            <Alert severity="info">
                                Use Employee ID: <strong>1001, 1002, 1003, 1004</strong> to Enter.
                            </Alert>
                        </Box>
                        <Stack spacing={3}>
                            <TextField
                                id="employeeID"
                                value={employeeID}
                                variant="outlined"
                                label="Employee ID"
                                error={!!fieldError}
                                helperText={fieldError}
                                inputProps={{
                                    "data-testid":"employee-id"
                                }}
                                onChange={(event) => setEmployeeID(event.target.value)}
                            />
                            {loading && <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>}
                            <Button
                                id="submit"
                                variant="contained"
                                color="primary"
                                type="submit"
                                data-testid="login-submit"
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </ContentStyle>
            </Container>
        </Box>
    )
}

export default Login;