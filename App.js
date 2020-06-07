import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Footer from "./components/Footer";
import { View, ActivityIndicator, Image } from "react-native";
import { useFonts } from "@use-expo/font";
import { c } from "./StylesColors.js";
import { RecipesProvider } from "./model/RecipesModel";
import "mobx-react-lite/batchingForReactNative";
import loader from "./assets/InitialAnimation_Quecomo.gif";
import * as Animatable from "react-native-animatable";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  const [counter, setCounter] = useState(true);

  const time = 5000;
  useEffect(() => {
    setTimeout(() => {
      setCounter(false);
    }, time);
  }, []);

  return counter || !fontsLoaded ? (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: c.graybg,
      }}
    >
      <Animatable.Image
        delay={time - 500}
        duration={500}
        animation="fadeOut"
        source={loader}
        style={{
          height: 50,
          resizeMode: "contain",
          margin: 2,
        }}
      />
    </View>
  ) : (
    <RecipesProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Footer style={{ flex: 1 }} />
        </NavigationContainer>
      </View>
    </RecipesProvider>
  );
};

export default App;
