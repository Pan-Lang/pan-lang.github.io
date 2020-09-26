import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Container from 'react-bootstrap/Container';
import { Button, Col, Row } from 'react-bootstrap';
const ENDPOINT = 'http://localhost:3000'; //needs to be changed to heroku after testing

// List of people with unfulfilled orders
let listPeople = [];

function SocketTest() {
  const [response, setResponse] = useState(listPeople);
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on('person', (data) => {
      eventHandler(data);
    });

    const eventHandler = (data) => {
      listPeople = listPeople.concat(data);
      setResponse(listPeople);
    };

    return () => {
      console.log('effect done');
      socket.off('person', eventHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function personFulfilled(id) {
    socket.emit('personFulfilled', id);
  }

  return (
    <Container>
      {response &&
        response.map((item, index) => (
          <Button
            key={item._id}
            size="lg"
            onClick={() => {
              personFulfilled(item._id);
            }}
          >
            {item._id} {item.lastname},{' '}
            {item.fulfilled !== undefined ? item.fulfilled.toString() : null},
            {item[index]}
          </Button>
        ))}
    </Container>
  );
}

export default SocketTest;
