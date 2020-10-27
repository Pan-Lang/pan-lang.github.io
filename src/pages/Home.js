import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { PEOPLE_ENDPOINT } from '../api/People';
import { BASE_API_URL } from '../api/Client';
import { MONTHS, MONTH_NAMES } from '../constants/Months';
import YEARS from '../constants/Years';

function Home() {
  const current = new Date();
  const [date, setDate] = useState({
    month: MONTHS[current.getMonth()],
    year: current.getFullYear(),
  });

  return (
    <Container style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 20 }}>
        <h1>Welcome to</h1>{' '}
        <h1>
          <font style={{ color: '#26B020', fontWeight: 'bold' }}>Pan-Lang</font>
        </h1>
      </div>
      <div>
        <Link to="/order" style={{ color: 'white' }}>
          <Button variant="success" size="lg" className="mb-3" block>
            Start a new order
          </Button>
        </Link>
      </div>
      <Link to="/stock" style={{ color: 'white' }}>
        <Button variant="success" size="lg" className="mb-3" block>
          Edit and add stock items
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
          Download order data
        </Button>{' '}
      </a>

      {/* Month selection dropdown here */}
      <Dropdown onChange={(e) => console.log(e)}>
        <Dropdown.Toggle
          variant="type"
          id="dropdown-basic"
          size="md"
          className="mb-3"
          style={{ backgroundColor: 'green', color: 'white' }}
        >
          Month: <b>{MONTH_NAMES[MONTHS.indexOf(date.month)]}</b>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {MONTHS.map((month) => (
            <Dropdown.Item
              onSelect={(key) => setDate({ ...date, month: key })}
              eventKey={month}
              key={month}
            >
              {MONTH_NAMES[MONTHS.indexOf(month)]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Year selection dropdown here */}
      <Dropdown onChange={(e) => console.log(e)}>
        <Dropdown.Toggle
          variant="type"
          id="dropdown-basic"
          size="md"
          className="mb-3"
          style={{ backgroundColor: 'green', color: 'white' }}
        >
          Year: <b>{date.year}</b>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {YEARS.map((year) => (
            <Dropdown.Item
              onSelect={(key) => setDate({ ...date, year: key })}
              eventKey={year}
              key={year}
            >
              {year}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default Home;
