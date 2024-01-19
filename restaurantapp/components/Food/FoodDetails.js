import { Text, View, Button, Image, StyleSheet } from "react-native"


export default function FoodDetails({ navigation, route }) {

    const { name, price, origin, date, image } = route.params;

    return (
        <View style={styles.foodContainer}>
            {image && <Image source={{ uri: image }} style={styles.foodImage} />}
            <View style={styles.foodDetails}>
                <Text style={styles.foodName}>{name}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.foodOrigin}>
                        <Text style={styles.boldText}>Origin: </Text>
                        {origin}
                    </Text>
                    <Text style={styles.foodPrice}>
                        <Text style={styles.boldText}>Price: </Text>
                        {price}
                    </Text>
                </View>
                <Text style={styles.foodDate}>
                    <Text style={styles.boldText}>Date: </Text>
                    {date}
                </Text>

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
        color: '#333',
    },
    foodPrice: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10
    },
    foodDate: {
        fontSize: 16,
        color: '#333',
       
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
