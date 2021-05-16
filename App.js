import React, { useState, useEffect } from "react";
import { I18nManager } from "react-native";
import AnimatedSplash from "react-native-animated-splash-screen";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import getFonts from "./app/utils/fonts";
import { AppLoading } from "expo";
import StackNavigator from "./app/containers/StackNavigator";
import { store } from "./app/store";

//* Support for RTL
//I18nManager.allowRTL(true);
//I18nManager.forceRTL(true);

const App = () => {
   
    const [fontLoading, setFontLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 2000);
    }, []);

    if (fontLoading) {
        return (
            <AnimatedSplash
                translucent={true}
                isLoaded={loading}
                logoImage={require("./app/assets/apps.png")}
                backgroundColor={"#000"}
                logoHeight={500}
                logoWidth={400}
            >
                <NavigationContainer>
                    <Provider store={store}>
                        <StackNavigator />
                    </Provider>
                </NavigationContainer>
            </AnimatedSplash>
        );
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontLoading(true)}
            />
        );
    }
};

export default App;
