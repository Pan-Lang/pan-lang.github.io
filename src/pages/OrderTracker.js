import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Container from 'react-bootstrap/Container';
import UnfulfilledOrderCard from '../components/UnfulfilledOrderCard';
import { BASE_API_URL } from '../api/Client';

/**
 * Page with list of people with unfulfilled orders
 */
function OrderTracker() {
  const [ordersList, setOrdersList] = useState([]);
  
  useEffect(() => {
    const socket = socketIOClient(BASE_API_URL);
    socket.on('person', (data) => {
      eventHandler(data); //has this been properly hooked?
    });

    const eventHandler = (personData) => {
      console.log(personData);
      console.log("inside eventhandler")
      console.log(ordersList);
      // var copyOrders = ordersList
      // copyOrders.push(personData)
      // setOrdersList(copyOrders);

      //currently this only displays the most recent order instead of all fulfilled orders
      //The commented code above actually adds it to the setOrdersList but the return function doesn't like recognize it?
      setOrdersList(ordersList.concat(personData));
      //ordersList doesn't like have anything in it?
      ordersList.forEach((order) => {
        console.log("hubba")
        console.log(order)
      })
    };

    return () => {
      console.log('effect done');
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function personFulfilled(id) {
    const socket = socketIOClient(BASE_API_URL);
    console.log("printing socket object: ")
    console.log(socket)

    console.log("emitting personfulfilled");
    socket.emit('personFulfilled', id)
    socket.on("personFulfillSuccess", function(confirmation) {
      console.log("confirmed " + confirmation);
      socket.disconnect();
    })
    // Remove fulfilled order from list after emitting fulfillment through socket
    setOrdersList(ordersList.filter((order) => order._id !== id));
  }

  return (
    <Container>
      {ordersList.length === 0 && <p>No orders at the moment.</p>}
      {ordersList &&
        ordersList.map((order) => (
          <UnfulfilledOrderCard
            fulfillPerson={personFulfilled}
            person={order}
            key={order._id}
          />
        ))}
    </Container>
  );
}

export default OrderTracker;
