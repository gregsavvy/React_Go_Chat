import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';
import { NativeRouter, Route } from "react-router-native";

import Header from './components/Header';
import Messages from './components/Messages';
import SendMsg from './components/SendMsg';
import Contacts from './components/Contacts';

import { v4 as uuidv4 } from 'uuid';

// specify backend address
var backend = 'ws://10.0.2.2:5000/'

const App = () => {

  // State to store messages
  const [msg, setMsg] = useState([])

  // State to store username
  const [username, setName] = useState("Anonymous")

  // State to store channels
  const [channels, setChannel] = useState({
    currentChannel: "general",
    bufferedChannels: [],
  })

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
        return [...prevItems, {key: uuidv4(), user: json_data.user, time: Date().toString().slice(0,24), text: json_data.msg, type: 'received'}];
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
            return [...prevItems, {key: uuidv4(), user: username, time: Date().toString().slice(0,24), text: text, type: 'sent'}];
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

  // change channel
  const changeChannel = (channel) => {
    if (!channel) {
      // do nothing
      } else {
          //send msg to server
          socket.current.send(`/channel ${channel}`)
          // save string
          setChannel(channels => {
            if (channels.bufferedChannels.includes(channels.currentChannel) == false) {
              channels.bufferedChannels.push(channels.currentChannel)
            }
            channels.currentChannel = channel
          })
      }
  }

  // quit server
  const quitCommand = () => {
      //send msg to server
      socket.current.send('/quit')
      // only for Android
      BackHandler.exitApp()
      // only for iOS, need to import library https://github.com/wumke/react-native-exit-app
      // RNExitApp.exitApp()
    }

  return (
    <NativeRouter>

      <Header changeName={changeName} changeChannel={changeChannel} quitCommand={quitCommand} />

        {/* define routes */}
        <Route exact path="/" render={() => 
        <View style={styles.container}>

          <Messages messages={msg} username={username} />
          <SendMsg sendMsg={sendMsg} username={username}/>
        
        </View>
        } />
        <Route exact path="/contacts" component={Contacts} />
    

    </NativeRouter>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App;