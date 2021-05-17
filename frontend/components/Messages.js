import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View
} from 'react-native';

const Item = ({ item, username }) => {
  if (item.user == username) {
    return <View style={styles.container_send}>
      <Text style={styles.user}>{item.user}</Text>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>

  } else if (item.user != username) {
    return <View style={styles.container_receive}>
      <Text style={styles.user}>{item.user}</Text>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  }
}

const Messages = ({ messages, username }) => {
  const renderItem = ({ item }) => (
    <Item item={item} username={username} />
  );
  
  return (
    <SafeAreaView>
      <FlatList
        data={messages}
        renderItem = {renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  user: {
    height: 20,
    margin: 5,
    borderWidth: 1,
  },
  time: {
    height: 20,
    margin: 5,
    borderWidth: 1,
  },
  text: {
    height: 40,
    margin: 5,
    borderWidth: 1,
  },
  container_send: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  container_receive: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },

});

export default Messages;