import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

/**
 * Global footer for Pan-Lang
 */
function Footer() {
  const classes = useStyles();
  return (
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

      {/* GitHub link */}
      <a
        href="https://github.com/Pan-Lang"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.github}
      >
        <IconButton aria-label="github">
          <GitHubIcon />
        </IconButton>
      </a>

      {/* Copyright */}
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
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: theme.spacing(5),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  github: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  copyright: {
    marginTop: theme.spacing(3),
  },
}));

export default Footer;
