import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1 align="center">
        Welcome to <font style={{ color: '#26B020' }}>Pan-Lang</font>!
      </h1>
      <br></br>
      <div>
        <Link to="/order" style={{ color: 'white' }}>
          <Button variant="success" size="lg" block>
            New Order
          </Button>
        </Link>
      </div>
      <br></br>
      <br></br>
      <Link to="/stock" style={{ color: 'white' }}>
        <Button variant="success" size="lg" block>
          Edit Stock
        </Button>{' '}
      </Link>
    </div>
  );
}

export default Home;
