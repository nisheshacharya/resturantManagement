import React from 'react';
import { View, Text, Image, StyleSheet, Platform, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Notes = ({ header, comment, date }) => {
    const navigation = useNavigation();

    const viewNotes = () => {
        navigation.navigate('noteDetails', { header, comment, date });
    };

    return (
        <View style={styles.foodContainer}>

            <View style={styles.foodDetails}>
                <Text style={styles.foodName}>{header}</Text>
                <View style={styles.infoContainer}>

                    <Text style={styles.foodPrice}>
                        <Text style={styles.boldText}>Comment: </Text>
                        {comment}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>

                    <TouchableHighlight style={styles.button} onPress={viewNotes}>
                        <Text style={styles.buttonText}>View</Text>
                    </TouchableHighlight>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    foodContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        padding: 10,
        width: '100%', // Set the width to 100% or adjust as needed
    },
    boldText: {
        fontWeight: 'bold',
    },
    foodImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginRight: 10,
        borderRadius: 5,
    },
    foodDetails: {
        //flex: 1,
    },
    foodName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: "flex-start",
        marginBottom: 10,

    },
    foodOrigin: {
        fontSize: 16,
        color: '#777',
    },
    foodPrice: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Notes;
