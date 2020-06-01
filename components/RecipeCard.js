import React, { useState, useContext } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { c, h3, p2, h5, h2 } from "../StylesColors.js";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  Alert,
  Modal,
  ScrollView,
  TouchableHighlight,
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
          {/* este view podría ser un Touchable para volver atrás lo malo es que al estar de fondo 
        parece que tocando en cualquier lado del modal se acciona 
        --> onPress={() => setModalVisible(!modalVisible)} */}
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
              <ScrollView>
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
                <View style={{marginTop: 18}}>
                  <Text style={h5}>INGREDIENTES</Text>
                  <View style={styles.ingredientsList}>
                    {recipe.ingredientLines.map((i, index) => (
                      <>
                        <TouchableNativeFeedback
                          key={index}
                          onPress={() => {
                            model.saveIngredients(i, true);
                          }}
                          //aqui estaria bien tener un estilo si clicas el ingrediente
                          // style={ saved ? styles.buttonPress : styles.button}
                        >
                          <Animatable.View
                            style={styles.capsule}
                            animation="fadeIn"
                          >
                            <Icon
                              name="add"
                              color={c.gray2}
                              size={20}
                              style={{ marginRight: 8 }}
                            />
                            <Text style={p2}>{i}</Text>
                          </Animatable.View>
                        </TouchableNativeFeedback>
                      </>
                    ))}
                  </View>
                </View>
                <View style={{marginTop: 18}}>
                  <Text style={h5}>INSTRUCCIONES???</Text>

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
    //justifyContent: "center",
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
    paddingRight: 15,
    elevation: 5,
    borderRadius: 50,
    flexDirection: "row",
  },
  ingredientsList: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 15,
    width: wp("64%"),
  },
});
