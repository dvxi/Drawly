import { StyleSheet, Text, View, Pressable } from 'react-native';

import Card from '../components/Card';

const Login = () => {
  return (
    <View style={styles.container}>
      <Card title="Wpisz swoje imię" content="Wyświetli się ono na ekranie, gdy nadejdzie kolej na Twoje ciastko" input />
      <Card title="Wpisz swoje imię" content="Wyświetli się ono na ekranie, gdy nadejdzie kolej na Twoje ciastko" input />
      <View style={styles.subcontainer}>
        <Text style={styles.textTitle}>
          Gotowy?
        </Text>
        <Text style={styles.textSecondary}>
          Gdy wykonasz wszystkie powyższe instrukcje przycisk poniżej zmieni się na aktywny.
        </Text>
      </View>
      <View style={styles.subcontainer}>
        <Pressable style={styles.button.main}>
          <Text style={styles.textMedium}>Przejdź do projektowania</Text>
        </Pressable>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  subcontainer: {
    alignItems: 'center',
    marginVertical: 25,
  },
  textMedium: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    marginVertical: 5,
  },
  textSecondary: {
    color: "#8E8E93",
    fontSize: 14,
    marginVertical: 5,
  },
  button: {
    main:{
      backgroundColor: '#FF8854',
      padding: 20,
      borderRadius: 15
    },
    secondary: {

    }
  }
});

export default Login;
