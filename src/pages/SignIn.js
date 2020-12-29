import React, { useState } from 'react';
import { Card, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function SignIn() {
  const [pantryName, setPantryName] = useState('');

  function handlePantryNameChange(e) {
    setPantryName(e.target.value);
  }

  function handleLogin() {
    console.log(`log in to pantry: ${pantryName}`);
  }

  function handleSignup() {
    console.log('signup');
  }

  return (
    <Container style={{ textAlign: 'center' }}>
      <h1>Log In</h1>
      <Card className="mb-3">
        <Card.Body>
          <p>Gain full access to your pantry's stock and current orders.</p>
          <InputGroup
            className="mb-3"
            size="lg"
            onChange={handlePantryNameChange}
          >
            <FormControl
              aria-label="Default"
              placeholder="Enter your pantry name here"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          <Button style={{ backgroundColor: 'green' }} onClick={handleLogin}>
            Login to your pantry
          </Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <p>Don't have a pantry with us yet?</p>
          <Button style={{ backgroundColor: 'green' }} onClick={handleSignup}>
            Sign up to create a pantry
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignIn;
