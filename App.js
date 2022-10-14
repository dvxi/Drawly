import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

const Navigator = (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} options={{
          title: 'Drawly',
          headerStyle: {
            backgroundColor: '#1c1c1e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
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
