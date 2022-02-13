import { Box, Typography } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

export default function Logo() {
    return <Box display="flex" alignItems="center" sx={{ height: 40 }}>
        <Typography variant="caption" gutterBottom>
            Hack <EmojiObjectsIcon /> Idea's
        </Typography>
    </Box>;
}
