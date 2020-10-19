import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Container from 'react-bootstrap/Container';
//import { Button, Col, Row } from 'react-bootstrap';
import Loading from '../components/Loading';
import { useHistory } from 'react-router-dom';
import UnfulfilledOrderCard from '../components/UnfulfilledOrderCard';
const ENDPOINT = 'http://localhost:3000'//'https://panlang.herokuapp.com/'; 

// List of people with unfulfilled orders
let listPeople = [];

/**
 * Page with list of people with unfulfilled orders
 */

 //TODO: Take away the spinning thingy when there are no orders that need to be fulfilled
 //might have to be a backend thing
 //check with Renzo on how the ordertrackerpage is being refreshed. This function is happening more than one time, so it outputs
//the console.log(socket) 2 times, but only disconnects one socket when the useEffect is done.
//so the component is being called twice because of the useEffect updating the useState. Only when you leave the page is the useEffect done and disconnecting all of the sockets

function OrderTrackerPage() {
  console.log("reached the order tracker"); //This is being print out twice, before and after the "socket connected"
  const history = useHistory();
  const [response, setResponse] = useState(listPeople);


  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log(socket);
    socket.on('person', (data) => {
      
      console.log("socket connected")
      console.log(data)
      eventHandler(data);
    });

    const eventHandler = (data) => {
      listPeople = listPeople.concat(data);
      setResponse(listPeople); //this causes a rerender so socket gets put on again without the disconnect
                              //with more things in the response, more things have to be rendered so the socket gets connected again
    };

    return () => {
      console.log('effect done');
      socket.disconnect(); //When you switch pages, it disconnects all sockets, so its ok if you're not trying to refresh the page like 10 times
                          //but if you do refresh the page, it adds 2 more sockets while only disconnecting one.
                          
    };
  // e slint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function personFulfilled(id) {
    console.log("emitting person fulfilled")
    const socket = socketIOClient(ENDPOINT);
    socket.emit('personFulfilled', id).then()
    // Refresh the page after emitting fulfillment
    //goes to UnfulfilledOrderCard which sends this function to the FulfillModal, which then will call this function when the Modal is submitted
    history.go(0);
  }

  return (
    <Container>
      {listPeople.length === 0 && <Loading />}
      {response &&
        response.map((person) => (
          <UnfulfilledOrderCard
            fulfillPerson={personFulfilled}
            person={person}
            key={person._id}
          />
        ))}
    </Container>
  );
}

export default OrderTrackerPage;
