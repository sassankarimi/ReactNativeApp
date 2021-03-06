import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

const CustomButton = ({ title, onPress, color = "tomato" }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color }]}
            onPress={onPress}
        >
            <CustomText fontFamily="ebrima" size="2" styles={styles.text}>
                {title}
            </CustomText>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "tomato",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginVertical: 5,
    },
    text: {
        color: "white",
    },
});
