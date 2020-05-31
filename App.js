import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Footer from "./components/Footer";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "@use-expo/font";
import { RecipesProvider } from './model/RecipesModel';
import 'mobx-react-lite/batchingForReactNative';

const App = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
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
