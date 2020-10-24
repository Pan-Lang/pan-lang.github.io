import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { PEOPLE_ENDPOINT } from '../api/People';
import { BASE_API_URL } from '../api/Client';

function Home() {
  // TODO: find a way to select date
  const [date, setDate] = useState({ month: 9, year: 2020 });

  return (
    <Container style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 20 }}>
        <h1>Welcome to </h1>{' '}
        <h1>
          <font style={{ color: '#35B82A', fontWeight: 'bold' }}>Pan-Lang</font>
        </h1>
      </div>
      <div>
        <Link to="/order" style={{ color: 'white' }}>
          <Button color="#2EFFD5" size="lg" className="mb-3" block>
            New Order
          </Button>
        </Link>
      </div>
      <Link to="/stock" style={{ color: 'white' }}>
        <Button variant="success" size="lg" className="mb-3" block>
          Edit Stock
        </Button>{' '}
      </Link>

      <br></br>
      <br></br>
      {/* I think we want an anchor tag w/ href and target=_blank , 
      if we use axios we have to hack around downloading the content for the user*/}
      <a
        href={`${BASE_API_URL}${PEOPLE_ENDPOINT}?${new URLSearchParams(date)}`}
      >
        <Button variant="success" size="lg" className="mb-3" block>
          Download Order Data
        </Button>{' '}
      </a>
    </Container>
  );
}

export default Home;
