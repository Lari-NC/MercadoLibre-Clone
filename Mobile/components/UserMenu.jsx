import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const UserMenu = () => {
    const router = useRouter()


    return (
        <View style={styles.conteiner}>
            <TouchableOpacity style={styles.button}  onPress={() => router.push('/(tabs)/user/likedProducts')} > 
                <Text style={styles.text}>Liked</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/user/sales')}>
                <Text style={styles.text}>Sales</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/user/purchases')}>
                <Text style={styles.text}>Purchases</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/user/myProducts')}>
                <Text style={styles.text}>My products</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    conteiner: {
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        height: 66,
        width: '100%',
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    text: {
        color: '#333333',
        fontSize: 24,
    },
});


export default UserMenu;