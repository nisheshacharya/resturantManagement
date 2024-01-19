import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../network'; // Import your login function
import UserContext from './Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = {
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginForm: {
    width: '80%',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
  },
  signupLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
  },
};

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const { state, setState } = useContext(UserContext);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const res = await login(user.email, user.password);

      if (res.success) {
        await AsyncStorage.setItem('token', res.token);

        setState({ ...state, user: res.data });
        Alert.alert('Login successful');
        navigation.navigate('Home'); // Replace 'Home' with your home screen
      } else {
        Alert.alert(res.error);
      }
    } catch (error) {
      Alert.alert('Error: Login failed');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginForm}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter your email"
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Enter your password"
          secureTextEntry
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
        <View style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Don't have an account? Register</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}


