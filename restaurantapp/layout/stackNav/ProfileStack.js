import { createStackNavigator } from '@react-navigation/stack';
import PersonalProfile from '../../components/profile/PersonalProfile';
import UpdateProfile from '../../components/profile/UpdateProfile';

const stack = createStackNavigator();

export default function ProfileStackNavigator() {
    return (
        <stack.Navigator>
            <stack.Screen name='userProfile' component={PersonalProfile} options={{headerShown:false}}  />
            <stack.Screen name='updateProfile' component={UpdateProfile} options={{title:"Update Profile"}}  />
        </stack.Navigator>
    )
}

