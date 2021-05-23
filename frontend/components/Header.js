import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import { BackButton } from "react-router-native";

import Options from './Options';

const Header = ({ changeName, changeChannel, quitCommand }) => {
  return (
    <View style={styles.header}>
      <BackButton/>
      <Text style={styles.text}>Websocket Chat</Text>
      <Options changeName={changeName} changeChannel={changeChannel} quitCommand={quitCommand} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
  },
});

export default Header;