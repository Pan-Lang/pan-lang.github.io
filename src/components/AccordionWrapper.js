import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

/**
 * Component that wraps children in accordion
 */
function AccordionWrapper({ summary, defaultExpanded = false, children }) {
  const classes = useStyles();
  return (
    <Accordion defaultExpanded={defaultExpanded}>
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
  details: {
    display: 'block',
  },
}));

export default AccordionWrapper;
