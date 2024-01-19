import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import your signup function
import { signup } from '../../network';




const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{10,24}$/;

export default function SignUp( {pr}) {
  
 
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const validatePassword = (password) => {
    return PWD_REGEX.test(password);
  };

  const handleSubmit = async () => {
    if (!validatePassword(user.password)) {
      confirm('Weak password');

      return;
    }

    if (user.password === user.confirmPassword) {
      try {
        const res = await signup(user.email, user.password);
       

        if (res.success) {
          confirm('Registration successful!');
          pr(true);
          navigation.navigate('login'); // Replace with your navigation logic
        } else {
          confirm(res.error);
        }
      } catch (error) {
        confirm('Error: Registration failed');
      }
    } else {
      confirm('Password mismatch');
    }
  };

  return (
    <View style={styles.signupContainer}>
      <Text style={styles.signupTitle}>SIGN UP</Text>
      <View style={styles.signupForm}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter your email"
          value={user.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Enter your password"
          secureTextEntry
          value={user.password}
          onChangeText={(text) => handleChange('password', text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Confirm your password"
          secureTextEntry
          value={user.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Register User</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}


import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  signupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signupForm: {
    width: '100%',
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
  loginButton: {
    marginTop: 10,
  },
  loginButtonText: {
    color: 'blue',
  },
});



