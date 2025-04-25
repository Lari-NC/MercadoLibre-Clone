import React from "react";
import { StyleSheet, View } from "react-native";
import Template from "../../../components/navigation/Template";
import UserMenu from "../../../components/UserMenu";
import CustomButton from "../../../components/CustomButton";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../../hooks/AuthContext";
import LoginForm from "../../../components/LoginForm";

export default function Person() {
    const router = useRouter();
    const {user, handleLogout} = useAuthContext()

    return (
        <>
                {user ? (
                    <Template name={user.name}>
                        <View style={styles.container}>
                            <UserMenu />
                            <View style={styles.spacer} />
                            <CustomButton title="Logout" onPress={handleLogout} />
                        </View>
                    </Template>
                ) : (
                    <View style={styles.login}>
                        <LoginForm/>
                    </View>
                )}
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        backgroundColor: '#E7E7E7',
        paddingBottom: 96,
    },
    spacer: {
        flex:1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    login: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#E7E7E7',
        paddingHorizontal: 8,
    }
});