import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
}));

export default function Page404() {
    return (
        <RootStyle data-testid="page-404">
            <Container>
                <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                    <Typography variant="h3" paragraph>
                        Sorry, page not found!
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
                        Be sure to check your spelling.
                    </Typography>

                    <Button sx={{ mt: 3 }} to="/" size="large" variant="contained" component={RouterLink}>
                        Go to Home
                    </Button>
                </Box>
            </Container>
        </RootStyle>
    );
}
