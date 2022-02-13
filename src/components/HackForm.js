import PropTypes from 'prop-types';
import { Chip, TextField, Button, Stack, MenuItem, Box, InputLabel, Select, FormControl, OutlinedInput, FormHelperText } from '@mui/material';
import React from 'react';

HackForm.propTypes = {
    handleSubmit: PropTypes.func,
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

export default function HackForm({ handleSubmit, tags = [] }) {
    const [errors, setErrors] = React.useState({});
    const [hackathon, setHackathon] = React.useState({
        CreationDate: new Date(),
        Tags: [],
        Votes: []
    });

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
            handleSubmit(true, { ...hackathon, EventDate: new Date(hackathon.EventDate) });
        }
    };

    return (
        <Stack data-testid="hack-add-form" spacing={1} sx={{ mt: 1 }}>
            <TextField
                variant="outlined"
                id="title"
                label="Title"
                type="text"
                name="Title"
                fullWidth
                onChange={handleChange}
                error={!!errors.Title}
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
                error={!!errors.Description}
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
                error={!!errors.EventDate}
                helperText={errors.EventDate}
            />
            <FormControl sx={{ m: 1 }} error={!!errors.Tags}>
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
                >
                    {tags.map(tag => <MenuItem key={tag.id} value={tag.Title}>{tag.Title}</MenuItem>)}
                </Select>
                <FormHelperText>{errors.Tags}</FormHelperText>
            </FormControl>
            <Stack direction="row" justifyContent="space-between">
                <Button variant="outlined" color="secondary" onClick={() => handleSubmit(false)}>Cancel</Button>
                <Button data-testid="hack-form-submit" variant="outlined" color="primary" onClick={submit}>Save</Button>
            </Stack>
        </Stack>
    )
}