import React from 'react';
import {
  Avatar,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 5,
      width: '100%',
    },
  },
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: theme.spacing(25),
    height: theme.spacing(25),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    marginBottom: 10,
  },
}));

function AvatarCard({ name, src, alt, role = 'Developer' }) {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.card}>
      <Container>
        <Avatar src={src} alt={alt} className={classes.avatar} />
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">{role}</Typography>
      </Container>
    </Paper>
  );
}

export default AvatarCard;
