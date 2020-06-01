import React, { useState, Children, useContext } from "react";
import { View, ScrollView, Text, TouchableNativeFeedback } from "react-native";
import { c, h1, p2 } from "../StylesColors.js";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/AntDesign";
import { RecipesContext } from "../model/RecipesModel.js";
import { observer } from "mobx-react";

const IngredientsPage = observer(() => {
  const model = useContext(RecipesContext);

  const [deletedList, setDeletedList] = useState([]);

  const deleteIngredient = (ingredient) => {
    let currentDeletedList = [...deletedList];
    currentDeletedList.push(ingredient);
    setDeletedList(currentDeletedList);
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <View
        style={{ backgroundColor: c.graybg, padding: 32, paddingBottom: 17 }}
      >
        <Text style={h1}>INGREDIENTES</Text>
      </View>
      <ScrollView>
        <View style={styles.ingredientsList}>
          {model.ingredients.map((ingredient, index) => (
            <TouchableNativeFeedback
              key={index}
              onPress={() => {
                model.saveIngredients(ingredient);
                deleteIngredient(ingredient);
              }}
            >
              <Animatable.View style={styles.capsule} animation="fadeIn">
                <Icon
                  name="close"
                  color={c.gray2}
                  size={20}
                  style={{ marginRight: 8 }}
                />
                <Text style={p2}>{ingredient}</Text>
              </Animatable.View>
            </TouchableNativeFeedback>
          ))}
        </View>
        {deletedList.length > 0 && (
          <Animatable.View
            animation="fadeIn"
            style={{ marginTop: 20, padding: 20 }}
          >
            <View
              style={{
                borderTopColor: c.gray3,
                borderTopWidth: 0.5,
                padding: 13,
                paddingLeft: 25,
                paddingBottom: 17,
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat-Light",
                  fontSize: 15,
                  color: c.gray3,
                }}
              >
                ELEMENTOS MARCADOS
              </Text>
            </View>
            {deletedList.map((ingredient, index) => (
              <TouchableNativeFeedback
                key={index}
                onPress={() => {
                  model.saveIngredients(ingredient, true);
                  deletedList.splice(index, 1);
                }}
              >
                <View style={styles.ingredient}>
                  <Icon
                    name="plus"
                    color={c.gray2}
                    size={20}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      color: c.gray2,
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                      fontFamily: "Montserrat-Regular",
                      fontSize: 14,
                    }}
                  >
                    {ingredient}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </Animatable.View>
        )}
      </ScrollView>
    </View>
  );
});

/*
{list.map((ingredient, index) => ( 
                <View key={index} style={styles.ingredient}>
                    {ingredient.amount && <Text>{ingredient.amount} </Text>}
                    <Text>{ingredient.title}</Text>
                </View>
            ))}
*/

export default IngredientsPage;

const styles = {
  ingredient: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  capsule: {
    marginLeft: 8,
    marginTop: 8,
    backgroundColor: c.graybg,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 20,
    elevation: 5,
    borderRadius: 50,
    flexDirection: "row",
  },

  ingredientsList: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 40,
  },
};
