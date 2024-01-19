import { createStackNavigator } from '@react-navigation/stack';

import { useState } from 'react';
import Cart from '../../components/Cart/Cart';
import orders from '../../components/Cart/Orders';

const stack = createStackNavigator();

export default function CartStackNavigator() {
    return (
        <stack.Navigator>
            <stack.Screen name='cart' component={Cart} options={{headerShown:false}}/>
            <stack.Screen name='orders' component={orders} options={{title:"Prders"}}/>
            
        </stack.Navigator>
    )

}

