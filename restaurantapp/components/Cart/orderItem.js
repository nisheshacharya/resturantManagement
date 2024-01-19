import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Platform, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { deleteFood } from '../../network';
import GlobalContext from '../../contex';
import { getFood } from '../../network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart } from '../../network';
import { CheckoutItem } from '../../network';

const OrderItem = ({ _id, name, price, origin, date, image }) => {
  const navigation = useNavigation();
  const { state, setState } = useContext(GlobalContext);



  return (
    <View style={styles.foodContainer}>
      {image && <Image source={{ uri: image }} style={styles.foodImage} />}
      <View style={styles.foodDetails}>
        <Text style={styles.foodName}>{name}</Text>
        <View style={styles.infoContainer}>
         
          <Text style={styles.foodPrice}>
            <Text style={styles.boldText}>Price: </Text>
            ${price}
          </Text>
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
    flexDirection: 'row',
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

export default OrderItem;
