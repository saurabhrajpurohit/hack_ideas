import React, { useEffect } from 'react';
import { Stack, Box, LinearProgress, Alert, Container, Typography } from '@mui/material';
import { HackathonService, TagsService } from '../service/Service';
import HackForm from '../components/HackForm';
import { useNavigate } from 'react-router';

export default function AddHack() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [tags, setTags] = React.useState([]);
    const [error, setError] = React.useState("");

    useEffect(() => {
        getTags();
    }, []);

    function getTags() {
        TagsService.getAll()
            .then(data => setTags(data))
            .catch(err => {
                console.error(err);
            });;
    };

    function handleSubmit(add, hackathon) {
        if (add) {
            setLoading(true);
            HackathonService.create(hackathon).then(data => {
                navigate("/hack/list");
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                console.error(err);
                setError("We are unable to create the hackathon at this time. Please try again later.");
            });
        } else {
            navigate("/hack/list");
        }
    };

    return (
        <Container maxWidth="sm">
            <Stack sx={{ mb: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Add Hackathon
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Please add the below details to add a new hackathon.</Typography>
            </Stack>
            {loading && <Box sx={{ width: '100%' }} mb={1}>
                <LinearProgress />
            </Box>}
            {error && <Box sx={{ width: '100%' }} pb={1}>
                <Alert severity="error">{error}</Alert>
            </Box>}
            <HackForm handleSubmit={handleSubmit} tags={tags} />
        </Container>
    )
}