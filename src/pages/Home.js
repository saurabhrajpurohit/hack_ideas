import React, { useEffect } from "react";
import { Add, ArrowCircleDownTwoTone, ArrowCircleUpTwoTone } from "@mui/icons-material";
import { Box, Alert, Button, Container, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import Hack from "../components/Hack";
import { HackathonService } from "../service/Service";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function Home() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [hackathons, setHackathon] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");
    const [sort, setSort] = React.useState({
        field: "CreationDate",
        order: "desc"
    });

    useEffect(() => {
        if (user) {
            getHackathons();
        } else {
            navigate("/login");
        }
    }, [user, navigate]);

    function getHackathons() {
        setLoading(true);
        HackathonService.getAll().then(data => {
            setHackathon(data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setError("We are unable to fetch the hackathons at this time. Please try again later.");
            setLoading(false);
        });
    };

    function upVote(upvote, hackathon) {
        if (upvote) {
            hackathon.Votes = [...hackathon.Votes, user.EmployeeID]
        } else {
            hackathon.Votes = hackathon.Votes.filter(vote => vote !== user.EmployeeID);
        }
        setLoading(true);
        HackathonService.update(hackathon.id, hackathon).then(data => {
            getHackathons();
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setError("We are unable to update the hackathon at this time. Please try again later.");
            setLoading(false);
        });
    };

    function handleSort(event) {
        setSort({
            field: event.target.name,
            order: sort.order === "asc" ? "desc" : "asc"
        });
    };

    function getSortedData(hackathons = [], sort) {
        if (sort.field === "Votes") {
            return hackathons.sort((a, b) => {
                return sort.order === "desc" ? a.Votes.length - b.Votes.length : b.Votes.length - a.Votes.length;
            });
        } else {
            return hackathons.sort((a, b) => {
                return sort.order === "desc" ? a[sort.field] - b[sort.field] : b[sort.field] - a[sort.field];
            });
        }
    };

    return (
        <Container data-testid="home-screen">
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" gutterBottom>
                    Hack Ideas <br />
                    <Typography variant="caption" gutterBottom>
                        Below are the challenges that are currently available.
                    </Typography>
                </Typography>
                <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                    <Button
                        name="Votes"
                        onClick={handleSort}
                        variant="outlined"
                        endIcon={
                            sort.field === "Votes" && (sort.order === "asc"
                                ? <ArrowCircleDownTwoTone />
                                : <ArrowCircleUpTwoTone />)
                        }
                    >
                        Vote
                    </Button>
                    <Button
                        name="CreationDate"
                        onClick={handleSort}
                        variant="outlined"
                        endIcon={
                            sort.field === "CreationDate" && (sort.order === "asc"
                                ? <ArrowCircleDownTwoTone />
                                : <ArrowCircleUpTwoTone />)
                        }
                    >
                        Latest
                    </Button>
                    <Button onClick={() => navigate("/hack/add")} variant="outlined" startIcon={<Add />} color="primary">Add New</Button>
                </Stack>
            </Stack>
            {error && <Box sx={{ width: '100%' }} pb={1}>
                <Alert severity="error">{error}</Alert>
            </Box>}
            {loading && <Box sx={{ width: '100%' }} pb={1}>
                <LinearProgress />
            </Box>}
            <Grid container spacing={3}>
                {getSortedData(hackathons, sort).map((hackathon) => (
                    <Grid key={hackathon.id} item xs={12}>
                        <Hack hackathon={hackathon} handleClick={(upvote) => upVote(upvote, hackathon)} userId={user.EmployeeID} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}