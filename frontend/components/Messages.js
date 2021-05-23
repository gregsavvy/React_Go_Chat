import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';

const Item = ({ item, username }) => {

  if (item.user == 'System') {
    return <View style={styles.container_receive}>
            <View style={styles.container_meta}>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.text_system}>{item.text}</Text>
          </View>
  } else if (item.type == 'sent') {
    return <View style={styles.container_send}>
            <View style={styles.container_meta}>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.text_send}>{item.text}</Text>
          </View>
  } else if (item.type == 'received') {
    return <View style={styles.container_receive}>
            <View style={styles.container_meta}>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.text_receive}>{item.text}</Text>
          </View>
  } 
}

const Messages = ({ messages, username }) => {
  const renderItem = ({ item }) => (
    <Item item={item} username={username} />
  );
  
  return (
    <SafeAreaView style={styles.flatlist}>
      <FlatList 
        data={messages}
        renderItem = {renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
  },
  user: {
    margin: 1,
    color: 'deepskyblue',
    textDecorationLine: 'underline',
  },
  time: {
    margin: 1,
    color: 'slategray',
    marginLeft: 'auto'
  },
  text_send: {
    padding: 10,    
    borderRadius: 15,
    backgroundColor: 'dodgerblue',
    color: 'white',
  },
  text_receive: {
    padding: 10,   
    borderRadius: 15,
    backgroundColor: 'springgreen',
    color: 'white',
  },
  text_system: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'orangered',
    color: 'white',
  },
  container_send: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    marginLeft: 100,
  },
  container_receive: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    marginRight: 100,
  },
  container_meta: {
    flexDirection: 'row',
  },

});

export default Messages;