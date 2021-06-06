import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';
import { NativeRouter, Route } from "react-router-native";

import { v4 as uuidv4 } from 'uuid';

import Header from './components/Header';
import Messages from './components/Messages';
import SendMsg from './components/SendMsg';
import Contacts from './components/Contacts';

import Realm from "realm";

// __utility block__ //

// specify backend address
var backend = 'ws://10.0.2.2:5000/'

// define schema for local on device storage
const MsgSchema = {
  name: "Msg",
  properties: {
    key: "string",
    user: "string",
    time: "string",
    text: "string",
    type: "string",
  },
};

const App = () => {

// __state block__ //

  // State to store messages
  const [msg, setMsg] = useState([]);

  // State to store username
  const [username, setName] = useState("Anonymous");

  // State to store channels
  const [channels, setChannel] = useState({
    currentChannel: "general",
    bufferedChannels: [],
  });

  // Special state to store backend address
  const socket = useRef(null);

// __useEffect block__ //

  // connect
  useEffect(() => {
    // Websocket server URL
    socket.current = new WebSocket(backend);

    socket.current.onopen = () => console.log("Connection opened");

  // open a local realm with the 'Msg' schema
  Realm.open({schema: [MsgSchema]})
    .then(realm => {
      setMsg(realm.objects("Msg"))
    });

    socket.current.onclose = () => console.log("Connection closed");
  }, [])

  // get msg
  useEffect(() => {
    if (!socket.current) return;

    // listen for messages
    socket.current.onmessage = (response) => {

      let jsonData = JSON.parse(response.data)

      let genKey = uuidv4()
      let date = Date().toString().slice(0,24)

      Realm
        .open({schema: [MsgSchema]})
        .then(realm => {
          // insert msg into the local database
          realm.write(() => {
            realm.create("Msg", {
              key: genKey,
              user: jsonData.user,
              time: date,
              text: jsonData.msg,
              type: 'received',
            });
          });
        });

      // set state of messages
      setMsg(prevItems => { 
        return [...prevItems, {key: genKey, user: jsonData.user, time: date, text: jsonData.msg, type: 'received'}];
      })
    }

}, [])

// __commands block__ //

  // send message to server
  const sendMsg = (text, username) => {
    if (!text) {
      // do nothing
      } else {
          //send msg to server
          socket.current.send(`/msg ${text}`)

          let genKey = uuidv4()
          let date = Date().toString().slice(0,24)

          Realm
          .open({schema: [MsgSchema]})
          .then(realm => {
            // insert msg into the local database
            realm.write(() => {
              realm.create("Msg", {
                key: genKey,
                user: username,
                time: date,
                text: text,
                type: 'sent',
              });
            });
          });

          // set state of messages
          setMsg(prevItems => {
            return [...prevItems, {key: genKey, user: username, time: date, text: text, type: 'sent'}];
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

// __render block__ //

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

// __style block__ //

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App;