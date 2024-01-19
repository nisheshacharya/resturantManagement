import { Text, View, Button, Image, StyleSheet } from "react-native"

export default function NoteDetails({ navigation, route }) {

    const { header, comment, date } = route.params;
   
    return (
        <View style={styles.foodContainer}>
            <View style={styles.foodDetails}>
                <Text style={styles.foodName}>{header}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.foodOrigin}>
                        <Text style={styles.boldText}>Comment: </Text>
                        {comment}
                    </Text>
                    <Text style={styles.foodPrice}>
                        <Text style={styles.boldText}>Date: </Text>
                        {date}
                    </Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Back" onPress={() => navigation.goBack()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    foodContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        padding: 10,
        width: '100%',
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
        color: '#333',
    },
    foodPrice: {
        fontSize: 16,
        color: '#333',
        // marginLeft: 10
    },
    buttonContainer: {

        justifyContent: 'center',
        marginTop: 10

    },
    button: {
        backgroundColor: '#FF6347',
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
