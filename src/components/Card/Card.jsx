import { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './Card.style';

const Card = (props) => {

  const changeHandler = (dataType, data) => {
    props.handleInput(dataType, data);
  }

  return (
    <View style={props.hasErrors != "" ? styles.cardErrorContainer : styles.cardContainer}>
      <Text style={ styles.title }>{props.title}</Text>
      <Text style={ styles.text }>
        {props.content}
      </Text>
      {props.input.map((input, index) => (
        <TextInput
          key={"input_" + index}
          placeholder={ input.placeholder }
          placeholderTextColor="#8E8E93"
          onChangeText={data => changeHandler(input.type, data)}
          value={props.value[index]}
          style={ styles.input } 
        />
      ))
      }
      <Text style={props.hasErrors ? styles.errorText : {}}>
        {props.hasErrors.split('\n').slice(0, -1).join('\n\n') + "\n"}
      </Text>
    </View>
  )
};

export default Card;
