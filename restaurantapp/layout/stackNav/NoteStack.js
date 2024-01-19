import { createStackNavigator } from "@react-navigation/stack";
const stack = createStackNavigator();
import DailyNotes from "../../components/Notes/DailyNotes";
import NoteDetails from "../../components/Notes/NoteDetails";
import AddNotes from "../../components/Notes/AddNote";
export default function NoteStackNavigator() {
    return (
        <stack.Navigator>
            <stack.Screen name="noteList" component={DailyNotes} options={{headerShown:false}} />
            <stack.Screen name="noteDetails" component={NoteDetails} options={{title:"Note Details"}} />
            <stack.Screen name="addNote" component={AddNotes} options={{title:"Add Note"}} />
        </stack.Navigator>
    )
}