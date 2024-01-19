import { createStackNavigator } from '@react-navigation/stack';
import ListFoods from '../../components/Food/ListFoods';
import FoodDetails from '../../components/Food/FoodDetails';
import AddFood from '../../components/Food/AddFood';
import EditFood from '../../components/Food/EditFood';
import { useState } from 'react';

const stack = createStackNavigator();

export default function FoodStackNavigator() {
    return (
        <stack.Navigator>
            <stack.Screen name='foodList' component={ListFoods} options={{headerShown:false}}/>
            <stack.Screen name='foodDetals' component={FoodDetails} options={{title:"Food Details"}} />
            <stack.Screen name='addFood' component={AddFood} options={{title:"Add Food"}}/>
            <stack.Screen name='editFood' component={EditFood} options={{title:"Edit Food"}}/>
        </stack.Navigator>
    )

}

