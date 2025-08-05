import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddEditTodoScreen from './src/screens/AddEditTodoScreen';

export type RootStackParamList = {
  Home: undefined;
  AddEditTodo: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Todo List' }} />
      <Stack.Screen name="AddEditTodo" component={AddEditTodoScreen} options={({ route }) => ({ title: route?.params?.id ? 'Edit Todo' : 'Add Todo' })} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;