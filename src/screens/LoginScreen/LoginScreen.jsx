import { useState } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Crypto from 'expo-crypto';
import axios from 'axios';
import styles from './LoginScreen.style';
import strings from '../../const/strings.const';
import Card from '../../components/Card';
import { cardData } from '../../const/card.const';

const Login = () => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [printerName, setPrinterName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({ user: "", printer: "" });

  let dataObject = {
    user: [userName],
    printer: [printerName, password]
  }

  const handleInput = (dataType, data) => {
    switch(dataType){
      case 'userName':
        setErrorMsg([errorMsg[0], ""]);
        setUserName(data);
        break;
      case 'printerName':
        setErrorMsg(["", errorMsg[1]]);
        setPrinterName(data);
        break;
      case 'password':
        setErrorMsg(["", errorMsg[1]]);
        setPassword(data);
        break;
      default:
        // console.log('incorrect dataType in Card');
        break;
    }
  }

  const logIn = async () => {
    const nameRegex = new RegExp('^[a-zA-Z]{2,40}$');
    const loginRegex = new RegExp('^[A-Za-z0-9_-]{8,16}$');
    const passwordRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

    let errors = { user: "", printer: "" };

    errors.user += nameRegex.test(userName) ? "" : "Username incorrect - use letters only\n";
    errors.printer += loginRegex.test(printerName) ? "" : "Login incorrect - use 8-16 characters (letters, numbers, characters '-' or '_')\n";
    errors.printer += passwordRegex.test(password) ? "" : "Password incorrect - use at least 6 characters and add a number, large letter or special character\n";

    if (Object.values(errors).findIndex((el) => el != "") >= 0) {
      setErrorMsg(errors);
      return;
    }

    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const data = JSON.stringify({
      "username": printerName,
      "password": passwordHash
    });
    
    const config = {
      method: 'post',
      url: 'https://http-nodejs-production-5172.up.railway.app/logIn',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };
    
    axios(config)
      .then((response) => {
        const printerID = response.data["printer_id"];
        if (!printerID) {
          errors.printer += "Failed to log in - check the credentials\n";
          setErrorMsg(errors);
          return;
        }
        
        navigation.navigate('Drawing', { name: userName, printerID });
      })
      .catch((error) => console.log(error));
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
          hasErrors={errorMsg[card.category] ?? ""}
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
            style={({ pressed }) => [(userName && printerName && password) ? styles.button.active : styles.button.disabled,
              pressed ? styles.button.pressed : {}]} 
            onPress={logIn}
            disabled={!(userName && printerName && password)}
          >
            <Text style={(userName && printerName && password) ? styles.textMedium.active : styles.textMedium.disabled}>
              {strings.loginScreen.button.text}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
};

export default Login;
