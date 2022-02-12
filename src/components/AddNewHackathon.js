import PropTypes from 'prop-types';
import { Chip, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Stack, MenuItem } from '@mui/material';
import React from 'react';
import { TagsService } from '../service/Service';

AddNewHackathon.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    tags: PropTypes.array
};

export default function AddNewHackathon({ open, handleClose, tags:[] }) {

    const [hackathon, setHackathon] = React.useState({});

    function handleChange(event) {
        setHackathon({ ...hackathon, [event.target.name]: event.target.value });
    }

    function submit() {
        handleClose(true, hackathon);
    }

    return (
        <Dialog fullWidth maxWidth="md" open={open}>
            <DialogTitle>Add Hackathon</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please add the below details to add a new hackathon.
                </DialogContentText>
                <Stack spacing={1} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        handleChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        handleChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        id="description"
                        label="Event Date"
                        type="date"
                        fullWidth
                        handleChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField select>
                        {tags.map(tag => <MenuItem>{tag}</MenuItem>)}
                    </TextField>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submit}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}