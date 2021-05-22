import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Options from './Options';

const Header = ({changeName}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Websocket Chat</Text>
      <Options changeName={changeName}/>
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