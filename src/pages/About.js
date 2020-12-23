import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  p: {
    marginTop: 8,
    marginBottom: 8,
  },
}));

function About() {
  const classes = useStyles();
  return (
    <Container
      maxWidth="md"
      style={{
        paddingBottom: 120,
        marginBottom: 20,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h2">
        {'About '}
        <font style={{ color: '#26B020', fontWeight: 'bold' }}>Pan-Lang:</font>
      </Typography>
      <Typography component="p" className={classes.p}>
        Pan-Lang is an organizational web application designed to help local
        food bank organizers keep track of orders, maintain visitor records, and
        communicate with non-English speaking patrons.
      </Typography>
      <Typography component="p" className={classes.p}>
        Food insecurity is an important issue in the Champain County community.
        Nearly 15% of residents must deal with food insecurity. Many of these
        individuals are also ineligible for federal nutrition programs and must
        rely on local food pantries for meals.
      </Typography>
      <Typography component="p" className={classes.p}>
        On top of this, many of these individuals speak limited English, making
        it difficult for them to communicate their needs to food pantry staff.
        With Pan-Lang, our mission is to break this language barrier and provide
        a more efficient method of supporting those in need.
      </Typography>
    </Container>
  );
}

export default About;
