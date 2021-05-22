import React from 'react';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';


const SendMsg = ({sendMsg, username}) => {
  const [text, onChangeText] = React.useState("");

  return (
    <SafeAreaView style={styles.btnWrapper}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Send your message..."
        value={text}
      />
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            sendMsg(text, username);
            onChangeText('');
          }}>
          <Text style={styles.btnText}>
            &#10140;
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  btn: {
    backgroundColor: 'limegreen',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 1,
    borderRadius: 50,    
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  btnWrapper: {
    flexDirection: 'row',
    padding: 0,
    margin: 2,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'silver',
  },
});

export default SendMsg;