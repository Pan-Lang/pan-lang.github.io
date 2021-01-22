import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { ABOUT, SIGN_IN } from '../../constants/Routes';
import { makeStyles } from '@material-ui/core';
import useMobile from '../../hooks/useMobile';
import { INFO } from '../../constants/Landing';

/**
 * Landing page for Pan-Lang.
 * The first thing people will see when visiting our web app.
 */
function Landing() {
  const isMobile = useMobile();

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      {/* Title */}
      <Typography
        variant={isMobile ? 'h3' : 'h1'}
        component="h1"
        align="center"
      >
        <b>Pan-Lang</b>
      </Typography>

      {/* Subtitle */}
      <Typography
        variant={isMobile ? 'body1' : 'h4'}
        component="h2"
        align="center"
        className={classes.subtitle}
      >
        Helping food pantry coordinators and patrons communicate
      </Typography>

      {/* Actions */}
      <Container maxWidth="sm" className={classes.actions}>
        <Grid container spacing={2}>
          {/* Link to sign in */}
          <Grid item md={6} xs={12}>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              to={SIGN_IN}
              className={classes.heroButton}
              fullWidth
            >
              Get Started
              <ChevronRightIcon />
            </Button>
          </Grid>

          {/* Link to About */}
          <Grid item md={6} xs={12}>
            <Button
              component={Link}
              variant="outlined"
              color="primary"
              to={ABOUT}
              className={classes.heroButton}
              fullWidth
            >
              About Pan-Lang
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Grid container className={classes.info}>
        {INFO.map((section) => (
          <Grid item md={4} xs={12} className={classes.infoSection}>
            {section.icon}
            <Typography
              variant={isMobile ? 'h5' : 'h5'}
              component="h3"
              className={classes.sectionTitle}
            >
              <b>{section.title}</b>
            </Typography>
            {section.body.map((p) => (
              <Typography paragraph>{p}</Typography>
            ))}
          </Grid>
        ))}
      </Grid>

      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          {'Pan-Lang'}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          {
            'Helping the language barrier between food pantry coordinators and non-English speakers.'
          }
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          className={classes.copyright}
        >
          {'Copyright © '}
          Pan-Lang {new Date().getFullYear()}
          {'.'}
        </Typography>
      </footer>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 110,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  subtitle: {
    fontWeight: 'lighter',
  },
  actions: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  heroButton: {
    padding: theme.spacing(2),
  },
  info: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
  },
  sectionTitle: {
    marginTop: theme.spacing(1),
  },
  infoSection: {
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(2),
    },
  },
  footer: {
    width: '100%',
    marginTop: 'auto',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  copyright: {
    marginTop: theme.spacing(3),
  }
}));

export default Landing;
