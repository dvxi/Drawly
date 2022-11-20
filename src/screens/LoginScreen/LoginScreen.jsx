import { useState, useEffect } from 'react';
import { Text, View, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Crypto from 'expo-crypto';
import axios from 'axios';
import styles from './LoginScreen.style';
import strings from '../../const/strings.const';
import Card from '../../components/Card';
import { cardData } from '../../const/card.const';
import useStore from '../../utilities/store'

const Login = () => {
  const navigation = useNavigation();

  const localUsername = useStore(state => state.name);
  const setLocalUsername = useStore(state => state.changeName);
  const localPrintername = useStore(state => state.printer);
  const setLocalPrintername = useStore(state => state.changePrinter);
  const localPassword = useStore(state => state.password);
  const setLocalPassword = useStore(state => state.changePassword);

  const [userName, setUserName] = useState("");
  const [printerName, setPrinterName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({ user: "", printer: "" });
  const [loggingIn, setLoggingIn] = useState(false);

  let dataObject = {
    user: [userName],
    printer: [printerName, password]
  }

  useEffect(() => {
    if(localUsername.length > 0 && localPrintername.length > 0 && localPassword.length > 0){
      setUserName(localUsername);
      setPrinterName(localPrintername);
      setPassword(localPassword);
      logIn(true);
    }
  }, [localUsername, localPrintername, localPassword]);

  const handleInput = (dataType, data) => {
    switch(dataType){
      case 'userName':
        setErrorMsg({...errorMsg, user: ""});
        setUserName(data);
        break;
      case 'printerName':
        setErrorMsg({...errorMsg, printer: ""});
        setPrinterName(data);
        break;
      case 'password':
        setErrorMsg({...errorMsg, printer: ""});
        setPassword(data);
        break;
      default:
        break;
    }
  }

  const logIn = async (autoLogin = false) => {
    if (!userName || !printerName || !password) return;

    const nameRegex = new RegExp('^[a-zA-Z]{2,40}$');
    const loginRegex = new RegExp('^[A-Za-z0-9_-]{8,16}$');
    const passwordRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

    let errors = { user: "", printer: "" };

    errors.user += nameRegex.test(userName) ? "" : "Username incorrect - use letters only\n";
    errors.printer += loginRegex.test(printerName) ? "" : "Login incorrect - use 8-16 characters (letters, numbers, characters '-' or '_')\n";
    errors.printer += passwordRegex.test(password) ? "" : "Password incorrect - use at least 6 characters and add a number, large letter or special character\n";

    if (!autoLogin && Object.values(errors).findIndex((el) => el != "") >= 0) {
      setErrorMsg(errors);
      setLoggingIn(false);
      return;
    }

    let passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    console.log(printerName, password, passwordHash);

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
          setLoggingIn(false);
          return;
        }
        
        setLocalUsername(userName);
        setLocalPrintername(printerName);
        setLocalPassword(password);

        navigation.navigate('Drawing', { name: userName, printerID });
        setLoggingIn(false);
      })
      .catch((error) => console.log(error));

    setLoggingIn(true);
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
          <Text style={styles.text.title}>{strings.loginScreen.subcontainer.title}</Text>
          <Text style={styles.text.secondary}>{strings.loginScreen.subcontainer.text}</Text>
          {
            loggingIn ?
            <ActivityIndicator />
            :
            <Pressable 
              style={({ pressed }) => [(userName && printerName && password) ? styles.button.main.active : styles.button.main.disabled,
                pressed ? styles.button.pressed : {}]} 
              onPress={logIn}
              disabled={!(userName && printerName && password)}
            >
              <Text style={(userName && printerName && password) ? styles.text.medium.active : styles.text.medium.disabled}>
                {strings.loginScreen.button.text}
              </Text>
            </Pressable>
          }
        </View>
      </ScrollView>
    </View>
  )
};

export default Login;
