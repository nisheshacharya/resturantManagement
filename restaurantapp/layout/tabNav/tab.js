import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FoodStackNavigator from '../stackNav/foodStack';
import NoteStackNavigator from '../stackNav/noteStack';
import ProfileStackNavigator from '../stackNav/profileStack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library
import CartStackNavigator from '../stackNav/CartStack';


const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator activeColor="#f0edf6" inactiveColor="black" barStyle={{ backgroundColor: 'lightgreen' }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    let iconColor = 'black'; // Set your desired color here
                    let iconSize = 24; // Set your desired size here

                    if (route.name === 'foodList') {
                        iconName = 'cutlery'; // Example icon name
                    } else if (route.name === 'dailyNotes') {
                        iconName = 'sticky-note'; // Example icon name
                    } else if (route.name === 'personal profile') {
                        iconName = 'user'; // Example icon name
                    }
                    else if (route.name === 'cart') {
                        iconName = 'shopping-cart'; // Example icon name for cart
                    }
                    

                    // You can return any component that you like here
                    return <Icon name={iconName} size={iconSize} color={iconColor} />;
                },
                
            })}

        >
            {/* Your Tab.Screen components here */}
            <Tab.Screen name="foodList" component={FoodStackNavigator} options={{title:"Food"}}/>
            <Tab.Screen name="dailyNotes" component={NoteStackNavigator} options={{title:"Notes"}} />
            <Tab.Screen name="cart" component={CartStackNavigator} options={{title:"Cart"}}/>
            <Tab.Screen name="personal profile" component={ProfileStackNavigator} options={{title:"Profile"}}/>
            
        </Tab.Navigator>
    )

}


