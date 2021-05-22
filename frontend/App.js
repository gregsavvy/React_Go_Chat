import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';

import Header from './components/Header';
import Messages from './components/Messages';
import SendMsg from './components/SendMsg';

import { v4 as uuidv4 } from 'uuid';

// specify backend address
var backend = 'ws://10.0.2.2:5000/'

const App = () => {

  // State to store messages
  const [msg, setMsg] = useState([])

  // State to store username
  const [username, setName] = useState("Anonymous")

  // Special state to store backend address
  const socket = useRef(null)

  // connect
  useEffect(() => {
    // Websocket server URL
    socket.current = new WebSocket(backend);

    socket.current.onopen = () => console.log("Connection opened")
    socket.current.onclose = () => console.log("Connection closed")

  }, [])

  // get msg
  useEffect(() => {
    if (!socket.current) return;

    // listen for messages
    socket.current.onmessage = (response) => {
      let json_data = JSON.parse(response.data)

      setMsg(prevItems => { 
        return [...prevItems, {key: uuidv4(), user: json_data.user, time: Date().toString().slice(0,24), text: json_data.msg}];
      })
    }

}, [])

  // send message to server
  const sendMsg = (text, username) => {
    if (!text) {
      // do nothing
      } else {
          //send msg to server
          socket.current.send(`/msg ${text}`)
          // save string
          setMsg(prevItems => {
            return [...prevItems, {key: uuidv4(), user: username, time: Date().toString().slice(0,24), text: text}];
          })
      }
    }

  // change name
  const changeName = (name) => {
    if (!name) {
      // do nothing
      } else {
          //send msg to server
          socket.current.send(`/name ${name}`)
          // save string
          setName(name)
      }
  }

  return (
    <View style={styles.container}>
      <Header changeName={changeName} />
      <Messages messages={msg} username={username}/>
      <SendMsg sendMsg={sendMsg} username={username}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App;