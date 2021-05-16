import React from 'react';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Text
} from 'react-native';


const SendMsg = ({sendMsg, username}) => {
  const [text, onChangeText] = React.useState("");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Send your message..."
        value={text}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          sendMsg(text, username);
          onChangeText('');
        }}>
        <Text style={styles.btnText}>
          Send
        </Text>
      </TouchableOpacity>
 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    margin: 5,
  },
  btn: {
    backgroundColor: 'dodgerblue',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default SendMsg;