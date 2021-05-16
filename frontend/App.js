import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';

import Header from './components/Header';
import Messages from './components/Messages';
import SendMsg from './components/SendMsg';

// specify backend address
var backend = 'ws://10.0.2.2:5000/'

const App = () => {
  const [msg, setMsg] = useState([{
    user: "",
    time: "", 
    text: ""
  }])

  const [username, setName] = useState("anonymous")

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
        return [...prevItems, {user: json_data.user, time: Date(), text: json_data.msg}];
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
            return [...prevItems, {user: username, time: Date(), text: text}];
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
      <Header />
      <Messages messages={msg}/>
      <SendMsg sendMsg={sendMsg}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App;