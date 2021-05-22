import React, {useState} from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput
} from 'react-native';

const Options = ({changeName}) => {

  // State to store options display
  const [options, setOptions] = useState(false)

  // State to store change username display
  const [optionsUsername, setOptionsUsername] = useState(false)

  const [text, onChangeText] = React.useState("");

  return (
    <View style={styles.containerAllOptions}>

      <TouchableOpacity onPress={() => setOptions(options => !options)}>
        <Text style={styles.btnOptions}>
          &#8286;
        </Text>
      </TouchableOpacity>

      <Modal
        changeName={changeName}
        optionsUsername={optionsUsername}
        animationType='fade'
        transparent={true}
        visible={options}
        onRequestClose={(options) => {
          setOptions(!options);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <TouchableOpacity
                style={styles.buttonMenu}
                onPress={() => setOptionsUsername(!optionsUsername)}
              >
              <Text style={styles.modalText}>Change username</Text>
            </TouchableOpacity>
   
            {optionsUsername === true && <View>
              <TextInput
                onChangeText={onChangeText}
                placeholder="Type your username..."
                value={text}
              />
              
                <TouchableOpacity
                  style={styles.btnName}
                  onPress={() => {
                    changeName(text);
                    onChangeText('');
                  }}>
                  <Text style={styles.btnTextName}>
                    Change
                  </Text>
                </TouchableOpacity>
            </View>
            }
           
            <TouchableOpacity
                style={styles.buttonMenu}
                onPress={() => null}
              >
              <Text style={styles.modalText}>Contacts</Text>
            </TouchableOpacity>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={(options) => setOptions(!options)}
            >
              <Text style={styles.textClose}>Go Back</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  btnOptions: {
    fontSize: 25,
    color: 'white',
    alignSelf: 'flex-end',
  },
  containerAllOptions: {
    flex: 1, 
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  buttonMenu: {
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    marginTop: 15,
    marginBottom: 3, 
  },
  buttonClose: {
    backgroundColor: "dodgerblue",
    marginTop: 10,
    alignSelf: 'stretch'
  },
  textClose: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: 'center'
  },
  btnName: {
    backgroundColor: 'limegreen',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 1,
    borderRadius: 15,    
  },
  btnTextName: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default Options;