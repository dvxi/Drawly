import { Text, View, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './LoginScreen.style';
import strings from '../../const/strings.const';
import Card from '../../components/Card';
import { cardData } from '../../const/card.const';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const renderCards = (cardData) => {
    return cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          content={card.content}
          input
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
          <Pressable style={styles.button.main} onPress={() => navigation.navigate('Drawing')}>
            <Text style={styles.textMedium}>{strings.loginScreen.button.text}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
};

export default Login;
