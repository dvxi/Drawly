import { useState } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './LoginScreen.style';
import strings from '../../const/strings.const';
import Card from '../../components/Card';
import { cardData } from '../../const/card.const';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [printerName, setPrinterName] = useState("");
  const [password, setPassword] = useState("");

  let dataObject = {
    user: [userName],
    printer: [printerName, password]
  }

  const handleInput = (dataType, data) => {
    switch(dataType){
      case 'userName':
        setUserName(data);
        break;
      case 'printerName':
        setPrinterName(data);
        break;
      case 'password':
        setPassword(data);
        break;
      default:
        // console.log('incorrect dataType in Card');
        break;
    }
  }

  const renderCards = (cardData) => {
    return cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          content={card.content}
          placeholder={card.placeholder}
          handleInput={handleInput}
          value={dataObject[card.category]}
          input={card.input}
        />
    ));
  };

  return (
    <View>
      <LinearGradient 
        colors={['#1C1C1EDD', '#FFFFFFDD']}
        style={styles.gradient}
        pointerEvents={'none'}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {renderCards(cardData)}
        <View style={styles.subcontainer}>
          <Text style={styles.textTitle}>{strings.loginScreen.subcontainer.title}</Text>
          <Text style={styles.textSecondary}>{strings.loginScreen.subcontainer.text}</Text>
          <Pressable 
          style={ (userName && printerName && password) ? styles.button.active : styles.button.disabled} 
          onPress={() => navigation.navigate('Drawing', {name: userName})}
          disabled={!(userName && printerName && password)}
          >
            <Text style={(userName && printerName && password) ? styles.textMedium.active : styles.textMedium.disabled}>{strings.loginScreen.button.text}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
};

export default Login;
