import { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './Card.style';

const Card = (props) => {
  const [ input, setInput ] = useState("");

  return (
    <View style={styles.cardContainer}>
      <Text style={ styles.title }>{props.title}</Text>
      <Text style={ styles.text }>
        {props.content}
      </Text>
      {props.input &&
        <TextInput
          placeholder="Twoje imię"
          placeholderTextColor="#8E8E93"
          onChangeText={setInput}
          value={input}
          style={ styles.input } 
        />
      }
    </View>
  )
};

export default Card;
