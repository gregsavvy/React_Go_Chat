import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';

const Message = ({ message, username }) => {
  if (message.name == username) {
  <View styles={styles.container-send}>
    <Text style={styles.name}>{message.name}</Text>
    <Text style={styles.date}>{message.date}</Text>
    <Text style={styles.text}>{message.text}</Text>
  </View>
  } else if (message.name != username) {
  <View styles={styles.container-receive}>
  <Text style={styles.name}>{message.name}</Text>
  <Text style={styles.date}>{message.date}</Text>
  <Text style={styles.text}>{message.text}</Text>
  </View>
  }
};

const Messages = ({ messages, username }) => {
  const renderMessages = ({ message }) => (
    <Message message={message} username={username}/>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={messages}
        renderMessages={renderMessages}
        keyExtractor={message => (message.name + "_" + message.date)}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  message: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default Messages;