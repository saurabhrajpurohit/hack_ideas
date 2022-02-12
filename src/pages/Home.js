import { Add } from "@mui/icons-material";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AddNewHackathon from "../components/AddNewHackathon";
import Hack from "../components/Hack";
import { HackathonService } from "../service/Service";

export default function Home() {
    const [hackathons, setHackathon] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [addNew, setAddNew] = React.useState(false);

    useEffect(() => {
        getHackathons();
    }, []);

    function getHackathons() {
        setLoading(true);
        HackathonService.getAll().then(data => {
            setHackathon(data);
            setLoading(false);
        });
    };

    function upVote(upvote, hackathon) {
        if (upvote) {
            hackathon.Votes = [...hackathon.Votes, 1001]
        } else {
            hackathon.Votes = hackathon.Votes.filter(vote => vote !== 1001);
        }
        HackathonService.update(hackathon.id, hackathon).then(data => {
            getHackathons();
        });
    }

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" gutterBottom>
                    Hack Ideas <br />
                    <Typography variant="caption" gutterBottom>
                        Below are the hackathons that are currently available.
                    </Typography>
                </Typography>
                <Button onClick={() => setAddNew(true)} variant="outlined" startIcon={<Add />} color="primary">Add New</Button>
            </Stack>
            <Grid container spacing={3}>
                {hackathons.map((hackathon) => (
                    <Grid key={hackathon.id} item xs={12} sm={6} md={3}>
                        <Hack hackathon={hackathon} handleClick={(upvote) => upVote(upvote, hackathon)} />
                    </Grid>
                ))}
            </Grid>
            <AddNewHackathon open={addNew} handleClose={() => setAddNew(false)} />
        </Container>
    )
}