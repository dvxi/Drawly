import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/LoginScreen/LoginScreen';
import Drawing from './src/screens/DrawingScreen/DrawingScreen';

const Stack = createNativeStackNavigator();

const navigationOptions = {
  headerStyle: {
    backgroundColor: '#1C1C1E'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  animation: 'slide_from_right'
};

const Navigator = (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen 
      name="Login"
      component={Login}
      options={{
        title: 'Drawly',
        ...navigationOptions,
      }}
    />
    <Stack.Screen 
      name="Drawing"
      component={Drawing}
      options={{
        title: 'Drawing Board',
        ...navigationOptions
      }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      {Navigator}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
