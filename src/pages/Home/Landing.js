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
import Footer from '../../components/Footer';
import theme from '../../constants/Theme';

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
        <font style={{ color: theme.palette.primary.altText, fontWeight: 'bold' }}>Pan-Lang</font>
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

      {/* Info */}
      <Grid container className={classes.info}>
        {INFO.map((section) => (
          <Grid item md={4} xs={12} className={classes.infoSection}>
            {section.icon}
            <Typography
              variant="h5"
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

      <Typography variant={isMobile ? 'h4' : 'h3'} align="center">
        Join <b>Pan-Lang</b> today.
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

      <Footer />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 110,
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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default Landing;
