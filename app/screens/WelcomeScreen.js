import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import CustomButton from "../components/shared/CustomButton";
import { StackActions, useNavigationState } from "@react-navigation/native";
import {
    Alert,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    BackHandler,
} from "react-native";
import CustomText from "./../components/shared/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { userAction } from "../actions";
import { decodeToken } from "./../utils/token";
import { customToast } from "./../utils/toasts";

const confirmationAlert = () => {
    return Alert.alert(
        "Connection",
        `You must be connected to the Internet to use the application`,
        [
            {
                text: "ok",
                onPress: BackHandler.exitApp,
            },
        ],
        { cancelable: false }
    );
};

const WelcomeScreen = ({ navigation }) => {
    const screenIndex = useNavigationState((state) => state.index);
    const dispatch = useDispatch();

    useEffect(() => {
        let currentCount = 0;

        if (screenIndex <= 0) {
            BackHandler.addEventListener("hardwareBackPress", () => {
                if (currentCount === 1) {
                    BackHandler.exitApp();
                    return true;
                }

                currentCount += 1;
                customToast("Touch the back button twice to exit");

                setTimeout(() => {
                    currentCount = 0;
                }, 1000);

                return true;
            });
        }
    }, []);

    useEffect(() => {
        const checkForNet = async () => {
            const state = await NetInfo.fetch();
            if (!state.isConnected) confirmationAlert();
            else {
                const token = await AsyncStorage.getItem("token");
                const userId = JSON.parse(await AsyncStorage.getItem("userId"));

                if (token !== null && userId !== null) {
                    const decodedToken = decodeToken(token);

                    dispatch(userAction(decodedToken.user));

                    if (decodedToken.user.userId === userId)
                        navigation.dispatch(StackActions.replace("Home"));
                    else {
                        await AsyncStorage.removeItem("token");
                        await AsyncStorage.removeItem("userId");
                        navigation.navigate("Login");
                    }
                }
            }
        };
        checkForNet();
    }, []);

    return (
        <ImageBackground
            source={require("../assets/bg1.jpg")}
            style={styles.background}
            blurRadius={0}
        >
            <View style={styles.logoContainer}>
            <CustomText
                    fontFamily="ebrima"
                    size="2.5"
                    styles={[styles.firstText, {marginVertical: 20}]}
                >
                  my name is Sassan Karimi
                </CustomText>
                <CustomText
                    fontFamily="ebrima"
                    size="2.8"
                    styles={styles.firstText}
                >
                   This is My first React-native App 
                </CustomText>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title="Login"
                    color="royalblue"
                    onPress={() => navigation.navigate("Login")}
                />
                <CustomButton
                    title="Register"
                    onPress={() => navigation.navigate("Register")}
                />
            </View>
        </ImageBackground>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonContainer: {
        width: "100%",
        padding: 20,
    },
    firstText: {
        top: 95,
        color: "#f2f2f2",
    },
    logo: {
        width: 260,
        height: 190,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },
});
