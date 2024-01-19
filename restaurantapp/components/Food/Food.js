import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Platform, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { deleteFood } from '../../network';
import GlobalContext from '../../contex';
import { getFood } from '../../network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToCart } from '../../network';

const Food = ({ _id, name, price, origin, date, image }) => {
  const navigation = useNavigation();
  const { state, setState } = useContext(GlobalContext);

  const getFoodfromDB = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      let data = await getFood(storedToken);
      
      setState(prevState => ({
        ...prevState,
        food: data.foods,
        cart: data.cart
      }));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCartfromDB = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      let data = await getFood(storedToken);
      setState({ ...state, cart: data.cart });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const viewfood = () => {
    navigation.navigate('foodDetals', { name, price, origin, date, image });
  };

  const editFood = () => {
    navigation.navigate('editFood', { _id, name, price, origin, date, image });
  };

  const foodAddToCart = async () => {

    const storedToken = await AsyncStorage.getItem('token');
    const newFood = {
      _id: _id,
      name: name,
      origin: origin,
      price: price,
      date: date,
      image: image
    }

    const ret = await addToCart(newFood, storedToken)

    if (ret.success) {

      getCartfromDB();
      confirm('Item added to cart');
     // navigation.navigate('foodList')
    }
    else {
      console.log(ret.message);
    }
  }

  const toDeleteFood = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    const success = await deleteFood(_id, storedToken);
    if (success) {
      getFoodfromDB();
      navigation.navigate('foodList');
    } else {
      console.log("food deletion failed");
    }
  };

  const toDelete = () => {
    if (Platform.OS === 'web') {
      const userConfirmed = confirm('Do you want to delete this food?');
      if (userConfirmed) {
        toDeleteFood();
      }
    } else {
      Alert.alert('Do you want to delete this food?', 'This action cannot be undone.', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => toDeleteFood(), style: 'destructive' },
      ]);
    }
  };

  return (
    <View style={styles.foodContainer}>
      {image && <Image source={{ uri: image }} style={styles.foodImage} />}
      <View style={styles.foodDetails}>
        <Text style={styles.foodName}>{name}</Text>
        <View style={styles.infoContainer}>
          {/* <Text style={styles.foodOrigin}>
            <Text style={styles.boldText}>Origin: </Text>
            {origin}
          </Text> */}
          <Text style={styles.foodPrice}>
            <Text style={styles.boldText}>Price: </Text>
            ${price}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button} onPress={editFood}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={viewfood}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={foodAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={toDelete}>
            <Text style={styles.buttonText}>Delete</Text>
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

export default Food;
