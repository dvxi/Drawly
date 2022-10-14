import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Card = (props) => {
  const [ input, setInput ] = useState("");

  return (
    <View style={styles.cardContainer}>
      <Text style={ styles.title }>{props.title}</Text>
      <Text style={ styles.text }>
        {props.content}
      </Text>
      { props.input &&
      <TextInput
      placeholder="Twoje imię"
      placeholderTextColor="#8E8E93"
      onChangeText={setInput}
      value={input}
      style={ styles.input } />
      }
    </View>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#3A3A3C',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginVertical: 15,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 6,
    fontSize: 16,
  },
  text: {
    color: '#8E8E93',
    padding: 6,
    fontSize: 14,
  },
  input: {
    width: '100%',
    backgroundColor: '#F2F2F7',
    borderRadius: 15,
    marginTop: 20,
    padding: 13,
  }
});

export default Card;
