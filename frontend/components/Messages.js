import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';


const Messages = ({messages}) => {
  console.log(messages)
  if (messages.length > 1) {
    var list = messages.map((message, index) => <Text key={index}>{message}</Text>)
  } else {
    var list = <Text>{messages.toString()}</Text>
  }

  return (
    <SafeAreaView>
      {list}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default Messages;