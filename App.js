import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Footer from "./components/Footer";
import { View, ActivityIndicator, Image } from "react-native";
import { useFonts } from "@use-expo/font";
import { RecipesProvider } from './model/RecipesModel';
import 'mobx-react-lite/batchingForReactNative';
import loader from './assets/InitialAnimation_Quecomo.gif';

const App = () => {

  const [fontsLoaded] = useFonts({
    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  const [counter, setCounter] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCounter(false);
    }, 5000);
  }, []);

  return ( counter || !fontsLoaded ?
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
        <Image source={loader} />
      </View>
    :
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
