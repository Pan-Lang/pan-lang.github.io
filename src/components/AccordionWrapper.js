import React from 'react';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

/**
 * Component that wraps children in accordion
 */
function AccordionWrapper({ summary, children, usePrimary = false }) {
  const classes = useStyles();
  return (
    <Accordion
      className={clsx(classes.accordion, usePrimary && classes.primary)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="stock-input-content"
        id="stock-input-header"
      >
        <Typography>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

const useStyles = makeStyles((theme) => ({
  accordion: {
    width: '100%',
  },
  primary: {
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#119178',
    },
  },
  details: {
    display: 'block',
  },
}));

export default AccordionWrapper;
