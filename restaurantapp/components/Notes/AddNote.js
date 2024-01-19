import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addNotes } from '../../network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalContext from '../../contex';
import { getNotes } from '../../network';


const AddNotes = ({ navigation }) => {
    const { state, setState } = useContext(GlobalContext)
    const [header, setHeader] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState(false);

    const getNotesfromDB = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            let data = await getNotes(storedToken);
            setState({ ...state, notes: data.notes })
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const handleSubmit = async () => {

        let today = new Date();

        if (!header) {
            // Alert.alert('Name is null', 'Please provide a valid name');
            setError(true)
            return
        }

        // Extract the day, month, and year
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        let yyyy = today.getFullYear();
        let formattedDate = mm + '/' + dd + '/' + yyyy;
        const storedToken = await AsyncStorage.getItem('token');
        const newNote = {
            header: header,
            comment: comment,
            date: formattedDate,
        }

        const ret = await addNotes(newNote, storedToken)

        if (ret.success) {
            getNotesfromDB();
            navigation.navigate('noteList')
        }
        else {
            console.log(ret.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Note</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Header"
                    value={header}
                    onChangeText={(text) => setHeader(text)}
                />
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    placeholder="Comment"
                    value={comment}
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => setComment(text)}
                />
            </View>
            {error&& <Text style={{color:"red"}}>Note header is mandatory</Text>}
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
    buttonContainer: {
      width: '80%',
    },
  });
  
export default AddNotes;
