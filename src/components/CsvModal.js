import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { Dialog, DialogActions, DialogTitle, InputLabel, MenuItem, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Backdrop from '@material-ui/core/Backdrop';
import { fetchPeople } from '../api/People';
import Button from 'react-bootstrap/esm/Button';

/**
 * Popup modal for downloading a csv file
 */

function CSVModal({
    show,
    handleClose
}) {

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    }

    const handleYearChange = (event) => {
        setYear(event.target.value);
    }
    async function getPeople() {
        fetchPeople()
    }
    //Current working on: getting both the forms to do things and send the API request, maybe need to reform the People.js in API too 
    const classes = useStyles();
    return (
        <Dialog
            open={show}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            centered
            className={classes.modal}>
            <DialogTitle>Enter month and year</DialogTitle>
            <Fade in={show}>
                <Paper className={classes.paper}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="month-select-label">Month</InputLabel>
                            <Select
                                labelId="month-select-label"
                                id="month-select"
                                value={month}
                                onChange={handleMonthChange}
                            >
                                <MenuItem value={1}>January</MenuItem>
                                <MenuItem value={2}>February</MenuItem>
                                <MenuItem value={3}>March</MenuItem>
                                <MenuItem value={4}>April</MenuItem>
                                <MenuItem value={5}>May</MenuItem>
                                <MenuItem value={6}>June</MenuItem>
                                <MenuItem value={7}>July</MenuItem>
                                <MenuItem value={8}>August</MenuItem>
                                <MenuItem value={9}>September</MenuItem>
                                <MenuItem value={10}>October</MenuItem>
                                <MenuItem value={11}>November</MenuItem>
                                <MenuItem value={12}>December</MenuItem>

                            </Select>

                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                required
                                id="year-textfield"
                                label="year"
                                defaultValue={new Date().getFullYear()}></TextField>
                        </FormControl>
                    <DialogActions>
                        <Button
                            id="get-people"
                            onClick={getPeople}>
                            Download Order Data
                        </Button>
                    </DialogActions>
                </Paper>
            </Fade>

        </Dialog>
    )
}
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        alignItems: 'center',
    },
    formControl: {
        minWidth: '120px',
        maxWidth: '200px',
        margin: '5px',
    }
}))
export default CSVModal;