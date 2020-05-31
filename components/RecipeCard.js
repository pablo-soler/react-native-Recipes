import React, { useState, useContext } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { c, h3 } from "../StylesColors.js";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  Alert,
  Modal,
  TouchableHighlight
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import { RecipesContext } from "../model/RecipesModel.js";
import { observer } from "mobx-react";

/*<TouchableNativeFeedback
        onPress={() => setModalVisible(true)}
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
      </TouchableNativeFeedback>*/

const RecipeCard = observer(({ item, H, fromFavourites }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const model = useContext(RecipesContext);

  const recipe = item.recipe;

  return ( recipe && 
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                raised
                containerStyle={{ backgroundColor: c.graybg }}
                style={{ ...styles.icon, justifyContent: 'start' }}
                underlayColor={c.gray2}
                name="reply"
                color={c.orange}
                onPress={() => setModalVisible(!modalVisible)}
              />
                <Icon
                  raised
                  containerStyle={{ backgroundColor: c.graybg }}
                  style={{ ...styles.icon, justifyContent: 'end' }}
                  underlayColor={c.gray2}
                  name={item.favourite ? "favorite" : "favorite-border"}
                  color={c.orange}
                  onPress={() => {
                    item.favourite = !item.favourite;
                    model.saveInFavourites(item, item.favourite);
                    fromFavourites && setModalVisible(false);
                  }}
                />
            </View>
            <Image
              source={{ uri: recipe.image }}
              style={{
                height: H,
                resizeMode: "cover",
                margin: 2,
                width: W - pd * 2,
                borderRadius: radius - 5,
              }}
            />
            <Text style={styles.modalText}>{recipe.label}</Text>
            <View>
            <Text>INGREDIENTS</Text>
              {recipe.ingredientLines.map((i, index) => <Text key={index}>{i}</Text>)}
            </View>
            <View>
              <Text>DIRECTIONS</Text>
              {recipe.ingredientLines.map((i, index) => <Text key={index}>{i}</Text>)}
            </View>
          </View>
        </View>
      </Modal>

      <TouchableNativeFeedback
        onPress={() => { setModalVisible(true) }}
      >
        <Animatable.View style={styles.card} animation="fadeInDown">
          <Image
            source={{ uri: recipe.image }}
            style={{
              height: H,
              resizeMode: "cover",
              margin: 2,
              width: W - pd * 2,
              borderRadius: radius - 5,
            }}
          />
          <Text style={h3}>{recipe.label}</Text>
        </Animatable.View>
      </TouchableNativeFeedback>
    </View>
  );
});

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
  centeredView: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    flexWrap: "wrap",
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  icon: {
    padding: 5,
    paddingRight: 30,
    fontSize: 18,
    flex: 1,
  },
});
