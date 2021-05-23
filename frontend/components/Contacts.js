import React from 'react';
import {View, Text, StyleSheet, Linking, Image} from 'react-native';

const Contacts = () => {
  return (
    <View>
      <View style={styles.container}>
        <Image
          style={{width: 20, height: 20, margin: 3}}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png',
          }}
        />      
        <Text style={styles.links}
              onPress={() => Linking.openURL('https://t.me/gregory_savitsky')}>
          Telegram at @Gregory_Savitsky
        </Text>
      </View>

      <View style={styles.container}>
        <Image
          style={{width: 20, height: 20, margin: 3}}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png',
          }}
        />
        <Text style={styles.links}
              onPress={() => Linking.openURL('mailto:gregsavvy@gmail.com')}>
          Mail at gregsavvy@gmail.com
        </Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  links: {
    color: 'dodgerblue',
    fontSize: 15,
    textAlign: 'left',
    margin: 5,
    textDecorationLine: 'underline',
  },
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'silver',
    margin: 3,
  },
});

export default Contacts;