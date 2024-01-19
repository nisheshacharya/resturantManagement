import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';
import GlobalContext from '../../contex';

import { getUser } from '../../network';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const PersonalProfile = () => {
  const { state, setState } = useContext(GlobalContext);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const id = "65345dafa7e75248f6c1dd5a";
  const { email, fullName, phoneNumber, address } = user;
  const navigation = useNavigation();

  const fetchData = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    setToken(storedToken);

    const userProfileResponse = await getUser(id, storedToken);

    if (userProfileResponse.success) {
      const userProfile = userProfileResponse.data.user;
      setUser(userProfile);
    } else {
      Alert.alert(`Error: ${userProfileResponse.error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setUser({});
    setToken(null);
    setState({ ...state, user: false })
    //navigation.navigate('AuthScreen');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Information</Text>
      <Image source={require(`../../images/sam.jpg`)} style={styles.userPhoto} />
      <Text style={styles.label}><Text style={{ fontWeight: "bold" }}>Email:</Text>  {email}</Text>
      <Text style={styles.label}><Text style={{ fontWeight: "bold" }}>Name:</Text>{fullName}</Text>
      <Text style={styles.label}><Text style={{ fontWeight: "bold" }}>Phome:</Text>{phoneNumber}</Text>
      <Text style={styles.label}><Text style={{ fontWeight: "bold" }}>Address:</Text> {address}</Text>
      <View style={styles.button}>
        <Button title="Update Profile" onPress={() => navigation.navigate('updateProfile', { setUser: setUser })} />
      </View>
      <View style={styles.button}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userPhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PersonalProfile;






