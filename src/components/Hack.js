import PropTypes from 'prop-types';
import { Card, Typography, Stack, Chip } from '@mui/material';
import { Recommend } from '@mui/icons-material';

Hack.propTypes = {
    hackathon: PropTypes.object,
    handleClick: PropTypes.func,
    userId: PropTypes.number
};

export default function Hack({ hackathon, handleClick, userId }) {
    const { Title, Description, EventDate, Tags, Votes } = hackathon;
    const isLiked = Votes.includes(userId);
    return (
        <Card elevation={4}>
            <Stack spacing={1} sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">
                        {Title}
                    </Typography>
                    <Chip
                        data-testid="upvote-element"
                        label={Votes.length}
                        size="small"
                        onClick={() => handleClick(!isLiked)}
                        icon={<Recommend />}
                        variant="outlined"
                        color={isLiked ? 'primary' : 'default'}
                    />
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="caption">
                        Event On: &nbsp;
                        <Typography
                            component="span"
                            variant="overline"
                            sx={{
                                color: 'text.primary',
                            }}
                        >
                            {new Date(EventDate.toDate()).toDateString()}
                        </Typography>
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                    {Tags.map(tag => (<Chip key={tag} size="small" color="success" label={tag} variant="outlined" />))}
                </Stack>
                <Typography variant="subtitle2" gutterBottom>
                    {Description}
                </Typography>
            </Stack>
        </Card >
    );
}
