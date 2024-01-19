import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
//import Food from './Food';

import { getFood } from '../../network';
import GlobalContext from '../../contex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from './CartItem';

export default function Cart({ navigation }) {
  const { state, setState } = useContext(GlobalContext);
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getCartfromDB = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        let data = await getFood(storedToken);
        setState({ ...state, cart: data.cart });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getCartfromDB();
  }, []);

  useEffect(() => {
    setCart(state.cart);
  }, [state.cart]);


  const goToOrders = () => {
    navigation.navigate('orders')
  }


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Items in Cart to checkout</Text>

      <View style={styles.gotoOrder}>
        <TouchableOpacity style={styles.addButton} onPress={goToOrders}>
          <Text style={styles.buttonText}>My Orders</Text>
        </TouchableOpacity>
      </View>
      <FlatList style={{ width: "100%" }}
        data={cart}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CartItem name={item.name} price={item.price} origin={item.origin} date={item.date} image={item.image} _id={item._id} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 20,
    width: '100%'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gotoOrder: {
    //justifyContent:"flex-end",
    flexDirection:"row",
    justifyContent: "flex-end"
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginLeft: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    //padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});
