import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../network';
import GlobalContext from '../../contex';

const styles = {
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginForm: {
        width: '100%',
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
};

export default function Login() {
    const [user, setUser] = useState({ email: '', password: '' });
    const { state, setState } = useContext(GlobalContext);
    const { email, password } = user;
    const navigation = useNavigation();

    const handleSubmit = async () => {
        try {
            const res = await login(email, password);

            if (res.token) {

                setState({ ...state, user: true })
                // Token is now stored in AsyncStorage
                await AsyncStorage.setItem('token', res.token);

            } else {
                Alert.alert('Login failed', res.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Login failed');
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
        </View>
    );
}



