import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getUser, updateProfile } from '../../network';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UpdateProfile = ({ route, navigation }) => {
  const { setUser } = route.params;
  const [user, setUserU] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const [token, setToken] = useState(null);
  const id = "65345dafa7e75248f6c1dd5a";

  const { email } = user;

  const fetchData = async () => {
    // Fetch the user's existing information
    const storedToken = await AsyncStorage.getItem('token');
    setToken(storedToken);

    const userProfileResponse = await getUser(id, storedToken);

    if (userProfileResponse.success) {
      const userProfile = userProfileResponse.data.user;
      setUserU(userProfile);
      setUser(userProfile);
      setEditedUser({ ...userProfile });
    } else {
      Alert.alert(`Error: ${userProfileResponse.error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = await updateProfile(editedUser, token);

      if (updatedProfile.success) {
        // Update user information in AsyncStorage
        await AsyncStorage.setItem('userProfile', JSON.stringify(editedUser));
        Alert.alert('Profile updated successfully');
        fetchData();
        // Navigate back to the PersonalProfile screen
        navigation.navigate('userProfile');
      } else {
        Alert.alert(`Error: ${updatedProfile.error}`);
      }
    } catch (error) {
      Alert.alert('Error: Profile update failed');
      console.error(error);
    }
  };


  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchData();
  //   }, [])
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email: {email}</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={editedUser.fullName || ''}
        onChangeText={(text) => setEditedUser({ ...editedUser, fullName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={editedUser.phoneNumber || ''}
        onChangeText={(text) => setEditedUser({ ...editedUser, phoneNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={editedUser.address || ''}
        onChangeText={(text) => setEditedUser({ ...editedUser, address: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={editedUser.newPassword || ''}
        onChangeText={(text) => setEditedUser({ ...editedUser, newPassword: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight:"bold"
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UpdateProfile;











