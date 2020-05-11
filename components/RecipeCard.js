import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { c, h3 } from "../StylesColors.js";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import * as Animatable from "react-native-animatable";

const RecipeCard = ({ image, title, H }) => {
  return (
    <TouchableHighlight
      style={styles.touchable}
      underlayColor="#ccc"
      onPress={() => {}}
    >
      <Animatable.View style={styles.card} animation="fadeInDown">
        <Image
          source={{ uri: image }}
          style={{
            height: H,
            resizeMode: "cover",
            margin: 2,
            width: W - pd * 2,
            borderRadius: radius - 5,
          }}
        />
        <Text style={h3}>{title}</Text>
      </Animatable.View>
    </TouchableHighlight>
  );
};

export default RecipeCard;

const W = wp("45%");
const radius = 20;
const pd = 10;

const styles = StyleSheet.create({
  touchable: {
    borderRadius: radius,
  },
  card: {
    position: "relative",
    width: W,
    flexDirection: "column",
    backgroundColor: c.graybg,
    alignItems: "center",
    borderRadius: radius,
    padding: pd,
    justifyContent: "space-between",
    elevation: 10,
    margin: 5,
  },
});
