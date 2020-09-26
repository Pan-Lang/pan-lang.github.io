import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import Container from 'react-bootstrap/Container';
import { Button, Col, Row } from 'react-bootstrap';
const ENDPOINT = "http://localhost:3000"; //needs to be changed to heroku after testing

let listpeople = []

function SocketTest() {

  
  
  const [response, setResponse] = useState(listpeople);
  const socket = socketIOClient(ENDPOINT)
    useEffect(() => {
      socket.on("person", data => {
        eventHandler(data)
        
      })

      const eventHandler = (data) => {
        listpeople = listpeople.concat(data)
          setResponse(listpeople)
      }
      return () => {
        console.log("effect done")
        socket.off("person", eventHandler(""))
      }
        
        
    }, [])

    function personFulfilled(id) {
      socket.emit("personFulfilled", id)
    }
    //useState(/*this sets initial value and kind of type*/) //keeps some memory for this component
    //useEffect()//as soon as this is rendered do all this code
    //also needs a list so it doesn't break forever

    //once they get fulfilled it needs to actually just delete it and then make a new one
  return (
    <Container>
      {response &&
        response.map((item, index) => (
          <Button key={item._id} size="lg" onClick = {() => {personFulfilled(item._id)}}>
            {item._id} {item.lastname}, {item.fulfilled.toString()},{item[index]}
          </Button>

        ))}
    </Container>
  );
}

export default SocketTest;
