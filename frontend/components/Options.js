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

import { Link } from "react-router-native";

const Options = ({changeName, changeChannel, quitCommand}) => {
   
  // State to store options display
  const [options, setOptions] = useState(false)

  // State to store change username display
  const [optionsUsername, setOptionsUsername] = useState(false)

  // State to store change channel display
  const [optionsChannel, setOptionsChannel] = useState(false)

  const [textUsername, onChangeTextUsername] = React.useState("");
  const [textChannel, onChangeTextChannel] = React.useState("");

  return (
    <View style={styles.containerAllOptions}>

      {/* Button to open options menu */}
      <TouchableOpacity onPress={() => setOptions(options => !options)}>
        <Text style={styles.btnOptions}>
          &#8286;
        </Text>
      </TouchableOpacity>

      {/* Pop-up modal screen */}
      <Modal
        changeName={changeName}
        optionsUsername={optionsUsername}

        changeChannel={changeChannel}
        optionsChannel={optionsChannel}

        quitCommand={quitCommand}

        Link={Link}

        animationType='fade'
        transparent={true}
        visible={options}
        onRequestClose={(options) => {
          setOptions(!options);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            {/* Change username button */}
            <TouchableOpacity
                style={styles.buttonMenu}
                onPress={() => setOptionsUsername(!optionsUsername)}
              >
              <Text style={styles.modalText}>Change username</Text>
            </TouchableOpacity>


            {/* Pop-up for Change username button */}
            {optionsUsername === true && <View>
              <TextInput
                onChangeText={onChangeTextUsername}
                placeholder="Type your username..."
                value={textUsername}
              />
              
                <TouchableOpacity
                  style={styles.btnName}
                  onPress={() => {
                    changeName(textUsername);
                    onChangeTextUsername('');
                  }}>
                  <Text style={styles.btnTextName}>
                    Change
                  </Text>
                </TouchableOpacity>
            </View>
            }

            {/* Change channel button */}
            <TouchableOpacity
                style={styles.buttonMenu}
                onPress={() => setOptionsChannel(!optionsChannel)}
              >
              <Text style={styles.modalText}>Change/Create channel</Text>
            </TouchableOpacity>

            {/* Pop-up for Change channel button */}
            {optionsChannel === true && <View>
              <TextInput
                onChangeText={onChangeTextChannel}
                placeholder="Type to create/connect..."
                value={textChannel}
              />
              
                <TouchableOpacity
                  style={styles.btnName}
                  onPress={() => {
                    changeChannel(textChannel);
                    onChangeTextChannel('');
                  }}>
                  <Text style={styles.btnTextName}>
                    Change
                  </Text>
                </TouchableOpacity>
            </View>
            }

            {/* Go to contacts screen */}
            <TouchableOpacity
                style={styles.buttonMenu}
            >
              <Link
                underlayColor="#f0f4f7"
                onPress={(options) => setOptions(!options)}
                to="/contacts"
              >
                <Text style={styles.modalText}>Contacts</Text>
              </Link>
            </TouchableOpacity>

            {/* Button to go back to chat */}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={(options) => setOptions(!options)}
            >
              <Link
                underlayColor="dodgerblue"
                onPress={(options) => setOptions(!options)}
                to="/"
              >
                <Text style={styles.textClose}>Go Back</Text>
              </Link>
            </Pressable>

            {/* Quit */}
            <Pressable
              style={[styles.button, styles.buttonExit]}
              onPress={quitCommand}
            >
              <Text style={styles.textClose}>Disconnect</Text>
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
  buttonExit: {
    backgroundColor: "red",
    marginTop: 20,
    alignSelf: 'stretch'
  },
  textClose: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: 'center',
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