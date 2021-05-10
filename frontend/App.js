import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';

import Header from './components/Header';
import Messages from './components/Messages';
import SendMsg from './components/SendMsg';

// specify backend address
var backend = 'ws://10.0.2.2:5000/'

const App = () => {
  const [msg, setMsg] = useState("");

  const socket = useRef(null);

  // connect
  useEffect(() => {
    // Websocket server URL
    socket.current = new WebSocket(backend);

    socket.current.onopen = () => console.log("Connection opened");
    socket.current.onclose = () => console.log("Connection closed");

  }, []);

  // get msg
  useEffect(() => {
    if (!socket.current) return;

    // listen for messages
    socket.current.onmessage = (response) => {
      setMsg(prevItems => {
        return [...prevItems, response.data];
      });
    };

}, []);

  // utility function to generate random id
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

  // send message to server
  const sendMsg = (text) => {
    if (!text) {
      // do nothing
      } else {
          //send msg to server
          socket.current.send(`/msg ${text}`)
          // save string
          setMsg(prevItems => {
            return [...prevItems, text];
          });
      }
    };

  return (
    <View style={styles.container}>
      <Header />
      <Messages messages={msg}/>
      <SendMsg sendMsg={sendMsg}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;