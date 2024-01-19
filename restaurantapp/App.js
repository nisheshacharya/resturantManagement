import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './layout/tabNav/tab';
import GlobalContext from './contex';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './components/profile/AuthScreen';

const App = () => {
  const [state, setState] = useState({ food: [], notes: [], user: false, cart:[], orders:[] });
  const stack = createStackNavigator();

  function authorization() {
    return (
      <stack.Navigator>
        <stack.Screen name='login' component={AuthScreen}  options={{headerShown:false}}/>
      </stack.Navigator>

    )
  }

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setState({ ...state, user: true });
      }
    };
    fetchToken();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      <NavigationContainer >
        {!state.user ? authorization() : <TabNavigator />}
      </NavigationContainer>
    </GlobalContext.Provider>
  );
};

export default App;
