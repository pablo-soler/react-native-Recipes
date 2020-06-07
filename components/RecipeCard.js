import React, { useState, useContext } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { c, h3, p2, h5, h2, h6 } from "../StylesColors.js";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  Alert,
  Modal,
  Button,
  ScrollView,
  Linking,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import { RecipesContext } from "../model/RecipesModel.js";
import { observer } from "mobx-react";

const RecipeCard = observer(({ item, H, fromFavourites }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const model = useContext(RecipesContext);

  const recipe = item.recipe;

  return (
    recipe && (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={(styles.centeredView, styles.modalBg)}>
            <View style={styles.modalView}>
              <View style={styles.topButtons}>
                <Icon
                  raised
                  underlayColor={c.gray2}
                  name="md-arrow-back"
                  type="ionicon"
                  color={c.orange}
                  onPress={() => setModalVisible(!modalVisible)}
                />
                <Icon
                  raised
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
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                  source={{ uri: recipe.image }}
                  style={{
                    height: 200,
                    resizeMode: "cover",
                    margin: 2,
                    width: W * 2 - 75,
                    borderRadius: radius - 5,
                  }}
                />
                <Text style={h2}>{recipe.label}</Text>
                <View style={{ marginTop: 18 }}>
                  <Text style={[h5, { marginBottom: 10 }]}>INGREDIENTES</Text>
                  {recipe.ingredientLines.map((ingredient, index) => {
                    let exists = model.ingredients.find(
                      (savedIngredient) => savedIngredient === i
                    );
                    return (
                      <View key={index} style={styles.list}>
                        <TouchableNativeFeedback
                          onPress={() => {
                            model.saveIngredients(ingredient, true);
                          }}
                        >
                          <Animatable.View
                            style={
                              exists
                                ? [styles.capsule, styles.selectedCapsule]
                                : [styles.capsule, styles.capsuleView]
                            }
                            animation="fadeIn"
                          >
                            <Icon
                              name={exists ? "remove" : "add"}
                              color={c.gray2}
                              size={20}
                              style={{ marginRight: 8 }}
                            />
                            <Text style={p2}>{ingredient}</Text>
                          </Animatable.View>
                        </TouchableNativeFeedback>
                      </View>
                    );
                  })}
                </View>
                <View style={{ marginTop: 18 }}>
                  <View >
                    <Text style={h5}>ETIQUETAS</Text>
                    <View style={styles.list}>
                      {recipe.healthLabels.map((label, index) => (
                        <Text
                          key={index}
                          style={[styles.capsule, styles.healthLabel, p2]}
                        >
                          {label}
                        </Text>
                      ))}
                      {recipe.cautions.map((label, index) => (
                        <Text
                          key={index}
                          style={[styles.capsule, styles.cautionLabel, p2]}
                        >
                          {label}
                        </Text>
                      ))}
                    </View>
                  </View>
                  <View
                    style={[h5, styles.url]}
                    onPress={() => Linking.openURL(recipe.url)}
                  >
                    <Icon
                      name="link"
                      color={c.orange}
                      size={25}
                    />
                    <Text style={[h6, {marginLeft: 10, color: c.orange,}]}>
                      INSTRUCCIONES
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <TouchableNativeFeedback
          onPress={() => {
            setModalVisible(true);
          }}
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
    )
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
    alignItems: "center",
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    width: wp("80%"),
    zIndex: 2,
  },
  modalBg: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    flex: 1,
    zIndex: -2,
  },
  modalView: {
    flex: 1,
    flexDirection: "column",
    margin: 40,
    width: wp("80%"),
    backgroundColor: c.graybg,
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    zIndex: 1,
  },
  capsule: {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 8,
    backgroundColor: c.graybg,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 18,
    elevation: 5,
    borderRadius: 50,
    flexDirection: "row",
  },
  capsuleView: {
    marginTop: 1,
  },
  selectedCapsule: {
    elevation: 1,
  },
  healthLabel: {
    backgroundColor: c.green,
    elevation: 1,
  },
  cautionLabel: {
    backgroundColor: c.red,
    elevation: 1,
  },
  list: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 10,
    width: wp("64%"),
  },

  url: {
    backgroundColor: c.graybg,
    paddingLeft: 17,
    elevation: 5,
    height:50,
    borderRadius: 30,
    borderColor: c.orange,
    borderWidth: 2,
    flexDirection: "row",
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 20,
    margin: 15
  },
});
