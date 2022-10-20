import { Text, View, Pressable } from 'react-native';
import styles from './LoginScreen.style';
import strings from '../../const/strings.const';
import Card from '../../components/Card';
import { cardData } from '../../const/card.const';

const Login = () => {
  const renderCards = (cardData) => {
    return cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          content={card.content}
          input
        />
      )
    );
  };

  return (
    <View style={styles.container}>
      {renderCards(cardData)}
      <View style={styles.subcontainer}>
        <Text style={styles.textTitle}>{strings.loginScreen.subcontainer.title}</Text>
        <Text style={styles.textSecondary}>{strings.loginScreen.subcontainer.text}</Text>
      </View>
      <View style={styles.subcontainer}>
        <Pressable style={styles.button.main}>
          <Text style={styles.textMedium}>{strings.loginScreen.button.text}</Text>
        </Pressable>
      </View>
    </View>
  )
};

export default Login;
