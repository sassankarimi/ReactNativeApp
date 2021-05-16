import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import Screen from "./../components/shared/Screen";
import { customToast, loadingToast, successToast } from "./../utils/toasts";
import {
    CustomForm,
    CustomFormField,
    SubmitButton,
} from "../components/forms";
import { loginUser } from "../api/users";
import Toast from "react-native-tiny-toast";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("this field is required")
        .email("Email is not Valid"),
    password: Yup.string()
        .required("this field is required")
        .min(4, "minimum 4 character"),
});

const LoginScreen = ({ navigation, route }) => {
    useEffect(() => {
        if (route.params.successRegister)
            successToast("Thank you for registering");
    }, []);

    const handleUserLogin = async (user) => {
        try {
            loadingToast("in progress ...");
            const status = await loginUser(user);
            if (status === 200) {
                Toast.hide();
                successToast("Login Successfully");
                // navigation.navigate("Home");
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                });
            } else {
                Toast.hide();
                customToast("Email or Password is not correct!");
            }
        } catch (err) {
            Toast.hide();
            console.log(err);
        }
    };

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <CustomForm
                initialValues={{ email: "", password: "" }}
                // onSubmit={() => navigation.navigate("Home")}
                onSubmit={(user) => {
                    handleUserLogin(user);
                }}
                validationSchema={validationSchema}
            >
                <CustomFormField
                    placeholder="type your Email"
                    autoCompleteType="email"
                    autoCorrect={false}
                    keyboardType="email-address"
                    icon="email"
                    name="email"
                    placeholderTextColor="royalblue"
                />
                <CustomFormField
                    placeholder="type your Password"
                    autoCompleteType="password"
                    autoCorrect={false}
                    icon="onepassword"
                    name="password"
                    placeholderTextColor="royalblue"
                    secureTextEntry
                />
                <View style={{ width: "60%", marginTop: 40 }}>
                    <SubmitButton title="Login" />
                </View>
            </CustomForm>
        </Screen>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    logo: {
        width: 250,
        height: 250,
        marginTop: 20,
        marginBottom: 40,
    },
});
