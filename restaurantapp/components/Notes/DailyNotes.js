import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getNotes } from '../../network';
import GlobalContext from '../../contex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notes from './Notes';

export default function DailyNotes({ navigation }) {
  const { state, setState } = useContext(GlobalContext);
  const [notes, setNote] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getFNotesfromDB = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        let data = await getNotes(storedToken);
        console.log("data", data)
        setState({ ...state, notes: data.notes });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getFNotesfromDB();
  }, []);

  useEffect(() => {
    setNote(state.notes);
  }, [state.notes]);

  const changeSearch = (text) => {
    setSearchText(text);
    if (text !== "") {
      let result = [...state.notes];
      const filteredNote = result.filter((note) => {
        return note.header.toLowerCase().includes(text.toLowerCase());
      });
      setNote(filteredNote);
    } else {
      setFood(state.notes);
    }
  };

  const addNote = () => {
    navigation.navigate('addNote');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notes</Text>


      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TextInput style={styles.searchInput} placeholder="Live Search" onChangeText={changeSearch} />
        <TouchableOpacity style={styles.addButton} onPress={addNote}>
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>

      </View>
      <FlatList style={{ width: "100%" }}
        data={notes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Notes header={item.header} comment={item.comment} date={item.date} _id={item._id} />
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
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginLeft:10
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
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});
