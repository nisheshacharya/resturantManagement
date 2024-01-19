import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalProfile from './PersonalProfile';
import UpdateProfile from './UpdateProfile';

const Stack = createStackNavigator();

const UserProfile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PersonalProfile" component={PersonalProfile} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
    </Stack.Navigator>
  );
};

export default UserProfile;


