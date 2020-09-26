import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { PEOPLE_ENDPOINT } from '../api/People';
import { BASE_API_URL } from '../api/Client';

function Home() {
  // TODO: find a way to select date
  const [date, setDate] = useState({ month: 9, year: 2020 });

  return (
    <div>
      <h1 align="center" style={{ marginBottom: 20 }}>
        Welcome to <font style={{ color: '#26B020' }}>Pan-Lang</font>!
      </h1>
      <div>
        <Link to="/order" style={{ color: 'white' }}>
          <Button variant="success" size="lg" className="mb-3" block>
            New Order
          </Button>
        </Link>
      </div>
      <Link to="/stock" style={{ color: 'white' }}>
        <Button variant="success" size="lg" className="mb-3" block>
          Edit Stock
        </Button>{' '}
      </Link>
      {/* I think we want an anchor tag w/ href and target=_blank , 
      if we use axios we have to hack around downloading the content for the user*/}
      <a
        href={`${BASE_API_URL}${PEOPLE_ENDPOINT}?${new URLSearchParams(date)}`}
      >
        <Button variant="success" size="lg" className="mb-3" block>
          Download
        </Button>{' '}
      </a>
    </div>
  );
}

export default Home;
