import { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './Card.style';

const Card = (props) => {

  const changeHandler = (dataType, data) => {
    console.log(dataType + " | " + data);
    props.handleInput(dataType, data);
  }

  return (
    <View style={props.value.filter((value) => value!="").length > 0 ? styles.cardCompleteContainer : styles.cardContainer}>
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
    </View>
  )
};

export default Card;
