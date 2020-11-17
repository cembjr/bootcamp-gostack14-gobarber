import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUp } from '../pages/SignUp';
import { SignIn } from '../pages/SignIn';

const Auth = createStackNavigator();

export const Route: React.FC = () => {
  return (
    <>
      <Auth.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#312e38' },
        }}
      >
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="SignUp" component={SignUp} />
      </Auth.Navigator>
    </>
  );
};
