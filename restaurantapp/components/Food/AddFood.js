import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addFood } from '../../network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalContext from '../../contex';
import { getFood } from '../../network';




const AddFood = ({ navigation }) => {

    const { state, setState } = useContext(GlobalContext)
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);




    const getFoodfromDB = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            let data = await getFood(storedToken);
            setState({ ...state, food: data.foods })
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const handleImageSelection = async () => {
        try {
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert('Permission to access camera roll is required!');
                return;
            }

            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3]
            })
        
            if (pickerResult.cancelled === true) {
                return;
            }

            setImage(pickerResult.uri);
        } catch (error) {
            console.error('Error picking image: ', error);
        }
    };



  
    const handleSubmit = async () => {
        // Handle form submission here

        // Get today's date


        if (!name) {
            // Alert.alert('Name is null', 'Please provide a valid name');
            setError(true)
            return
        }

        let today = new Date();

        // Extract the day, month, and year
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        let yyyy = today.getFullYear();
        let formattedDate = mm + '/' + dd + '/' + yyyy;
        const storedToken = await AsyncStorage.getItem('token');
        const newFood = {
            name: name,
            origin: origin,
            price: price,
            date: formattedDate,
            image: image
        }

        const ret = await addFood(newFood, storedToken)

        if (ret.success) {

            getFoodfromDB();
            navigation.navigate('foodList')
        }
        else {
            console.log(ret.message);
        }


    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Food</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Origin"
                    value={origin}
                    onChangeText={(text) => setOrigin(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    keyboardType="numeric"
                />
            </View>
            <Button title="Select Image" onPress={handleImageSelection} />
            {image && <Image source={{ uri: image }} style={styles.image} />}

            {error&& <Text style={{color:"red"}}>Food name is mandatory</Text>}
            <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    formContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '80%',
        marginTop: 10
    },
});

export default AddFood;
