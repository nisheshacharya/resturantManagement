import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Login from './Login';
import Signup from './Signup';


export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>
        {isLogin ? <Login /> : <Signup pr={setIsLogin} />}
      </View>
      <Button
        title={isLogin ? 'Switch to Signup' : 'Switch to Login'}
        onPress={toggleForm}
        style={styles.toggleButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%', // Adjust the width
    height: '80%', // Adjust the height
  },
  title: {
    fontSize: 28, // Increase the font size
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleButton: {
    marginTop: 20,
  },
  // You can add more styles for buttons, input fields, and other components as needed.
});
