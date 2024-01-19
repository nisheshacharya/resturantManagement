import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signup } from '../network'; // Import your signup function
import styles from './SignUpStyles'; // Define your styles using StyleSheet

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{10,24}$/;

export default function SignUp() {
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
      Alert.alert('Weak password');
      return;
    }

    if (user.password === user.confirmPassword) {
      try {
        const res = await signup(user.email, user.password);

        if (res.success) {
          Alert.alert('Registration successful!');
          navigation.navigate('Login'); // Replace with your navigation logic
        } else {
          Alert.alert(res.error);
        }
      } catch (error) {
        Alert.alert('Error: Registration failed');
      }
    } else {
      Alert.alert('Password mismatch');
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
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButtonText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
}

