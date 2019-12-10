import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
}));


export default function Information() {
    const classes = useStyles();

    return (
        <Fragment>
            <div className={classes.root}>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item md={12} xs={12}>
                  
                        <TextField
                            id="firstName"
                            label="Firstname"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
             
                        <TextField
                            id="lastName"
                            label="Lastname"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Grid container
                    direction="row"
                    spacing={1}
                >
                    <Grid item md={12} xs={12}>
                        <Grid item md={12} xs={12}>
               
                            <TextField
                                id="nickname"
                                label="Nickname"
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}