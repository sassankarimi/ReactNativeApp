import React from "react";
import Toast from "react-native-tiny-toast";
import { View, StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import Screen from "../components/shared/Screen";
import { registerUser } from "./../api/users";
import {
    CustomForm,
    CustomFormField,
    SubmitButton,
} from "../components/forms";
import { loadingToast, customToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("this field is required"),
    email: Yup.string()
        .required("this field is required")
        .email("Email is not Valid"),
    password: Yup.string()
        .required("this field is required")
        .min(4, "minimum 4 character"),
    passwordConfirmation: Yup.string()
        .required("this field is required")
        .oneOf([Yup.ref("password"), null], "Password must be equal!"),
});

const RegisterScreen = ({ navigation }) => {
    const handleUserRegistration = async (user) => {
        try {
            loadingToast("in Progress...");
            const status = await registerUser(user);

            if (status === 201) {
                //navigation
                Toast.hide();
                navigation.navigate("Login", { successRegister: true });
            } else {
                //show error
                Toast.hide();
                customToast("Register failed!");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <CustomForm
                initialValues={{
                    fullname: "",
                    email: "",
                    password: "",
                    passwordConfirmation: "",
                }}
                onSubmit={(user) => {
                    // console.log(user);
                    handleUserRegistration(user);
                }}
                validationSchema={validationSchema}
            >
                <CustomFormField
                    placeholder="type your Fullname"
                    autoCorrect={false}
                    icon="account-circle"
                    name="fullname"
                    placeholderTextColor="royalblue"
                />
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
                    placeholder="Password"
                    autoCorrect={false}
                    icon="onepassword"
                    name="password"
                    placeholderTextColor="royalblue"
                    secureTextEntry
                />
                <CustomFormField
                    placeholder="repeat your Password"
                    autoCorrect={false}
                    icon="onepassword"
                    name="passwordConfirmation"
                    placeholderTextColor="royalblue"
                    secureTextEntry
                />
                <View style={{ width: "60%", marginTop:20 }}>
                    <SubmitButton title="Register" />
                </View>
            </CustomForm>
        </Screen>
    );
};

export default RegisterScreen;

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
