import React, { useContext, useState } from 'react';
import { View,Text, TextInput, Button, Image,StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { editFood } from '../../network';
import GlobalContext from '../../contex';
import { getFood } from '../../network';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EditFood({ navigation, route }) {


    const { state, setState } = useContext(GlobalContext);

    const [name, setName] = useState(route.params.name);
    const [origin, setOrigin] = useState(route.params.origin);
    const [price, setPrice] = useState(route.params.price);
    const [date, setDate] = useState(route.params.date);
    const [image, setImage] = useState(route.params.image);
    const [error, setError] = useState(false);



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

    const handleSubmit = async () => {
        // Handle form submission here

        
        if (!name) {
            // Alert.alert('Name is null', 'Please provide a valid name');
            setError(true)
            return
        }

        const newFood = {
            name: name,
            origin: origin,
            price: price,
            date: date,
            image: image,
            _id: route.params._id
        }
        const storedToken = await AsyncStorage.getItem('token');
        const ret = await editFood(newFood, storedToken)

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
            <Text style={styles.heading}>Edit Food</Text>
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
                {/* Custom DatePicker component can be added here */}
            </View>
            <Button title="Select Image" onPress={handleImageSelection} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {error&& <Text style={{color:"red"}}>Food name is mandatory</Text>}
            <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
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
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 12,
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '80%',
    },
});
