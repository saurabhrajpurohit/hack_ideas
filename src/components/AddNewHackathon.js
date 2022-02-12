import PropTypes from 'prop-types';
import { Chip, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Stack, MenuItem, Box, LinearProgress, InputLabel, Select, FormControl, OutlinedInput } from '@mui/material';
import React, { useEffect } from 'react';

AddNewHackathon.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    tags: PropTypes.array
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function AddNewHackathon({ open, handleClose, tags = [] }) {
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const [hackathon, setHackathon] = React.useState({
        CreationDate: new Date(),
        Tags: [],
        Votes: []
    });

    useEffect(() => {
        setErrors({});
        setHackathon({
            CreationDate: new Date(),
            Tags: [],
            Votes: []
        });
        setLoading(false);
    }, [open]);

    function handleChange(event) {
        setHackathon({ ...hackathon, [event.target.name]: event.target.value });
    };

    function handleTags(event) {
        const {
            target: { value },
        } = event;
        setHackathon({ ...hackathon, Tags: typeof value === 'string' ? value.split(',') : value });
    };

    function isValid() {
        let errors = {};
        if (!hackathon.Title) {
            errors.Title = "Title is required";
        }
        if (!hackathon.Description) {
            errors.Description = "Description is required";
        }
        if (!hackathon.EventDate) {
            errors.EventDate = "Event Date is required";
        }
        if (!hackathon.Tags.length) {
            errors.Tags = "Please select at least one tag.";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    function submit() {
        if (isValid()) {
            setLoading(true);
            handleClose(true, { ...hackathon, EventDate: new Date(hackathon.EventDate) });
        }
    };

    return (
        <Dialog fullWidth maxWidth="md" open={open}>
            <DialogTitle>Add Hackathon</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please add the below details to add a new hackathon.
                </DialogContentText>
                {loading && <Box sx={{ width: '100%' }} pb={1}>
                    <LinearProgress />
                </Box>}
                <Stack spacing={1} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        id="title"
                        label="Title"
                        type="text"
                        name="Title"
                        fullWidth
                        onChange={handleChange}
                        error={errors.Title}
                        helperText={errors.Title}
                    />
                    <TextField
                        variant="outlined"
                        id="description"
                        label="Description"
                        type="text"
                        name="Description"
                        fullWidth
                        multiline
                        rows={4}
                        onChange={handleChange}
                        error={errors.Description}
                        helperText={errors.Description}
                    />
                    <TextField
                        variant="outlined"
                        id="description"
                        label="Event Date"
                        type="date"
                        name="EventDate"
                        fullWidth
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={errors.EventDate}
                        helperText={errors.EventDate}
                    />
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel id="hackathon-tags-label">Tags</InputLabel>
                        <Select
                            labelId="hackathon-tags-label"
                            id="tags"
                            multiple
                            fullWidth
                            value={hackathon.Tags}
                            onChange={handleTags}
                            input={<OutlinedInput id="select-tags" label="Tags" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip size="small" key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            error={errors.Tags}
                            helperText={errors.Tags}
                        >
                            {tags.map(tag => <MenuItem value={tag.Title}>{tag.Title}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false)}>Cancel</Button>
                <Button onClick={submit}>Save</Button>
            </DialogActions>
        </Dialog >
    )
}