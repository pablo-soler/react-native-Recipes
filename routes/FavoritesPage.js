import React from "react";
import { View, Text, Button } from "react-native";
import {c,h1} from "../StylesColors.js";
import RecipeList from "../components/RecipeList.js";

// recipe de ejemplo en objeto
const recipe = {
  uri:
    "http://www.edamam.com/ontologies/edamam.owl#recipe_78b73aea7f002f5420ecbc85b8f0328b",
  label: "Lemon Meringue Pie recipes",
  image: "https://www.edamam.com/web-img/e05/e05a9c03f56332fe9821260aab9db9af",
  source: "Martha Stewart",
  url: "http://www.marthastewart.com/340995/lemon-meringue-pie",
  shareAs:
    "http://www.edamam.com/recipe/lemon-meringue-pie-recipes-78b73aea7f002f5420ecbc85b8f0328b/null",
  yield: 4.0,
  dietLabels: ["Balanced"],
  healthLabels: ["Vegetarian", "Peanut-Free", "Tree-Nut-Free", "Alcohol-Free"],
  cautions: [],
  ingredientLines: [
    "null",
    "1 cup cold water",
    "null",
    "8 large eggs, whites only",
    "2/3 cups sugar",
    "1/4 teaspoon coarse salt",
  ],
  ingredients: [
    {
      text: "1 cup cold water",
      weight: 237.0,
    },
    {
      text: "8 large eggs, whites only",
      weight: 400.0,
    },
    {
      text: "2/3 cups sugar",
      weight: 133.33333333333331,
    },
    {
      text: "1/4 teaspoon coarse salt",
      weight: 1.2135416667282188,
    },
  ],
  calories: 1088.0,
  totalWeight: 771.5468750000615,
  totalTime: 70.0,
};
//ejemplo recipelist

const FavoritesPage = ({ navigation }) => {
  const recipes = [];
  for (let i = 0; i < 20; i++) {
    recipes[i] = recipe;
  }

  return (
    <View>
      <View style={{ backgroundColor: c.graybg, padding: 32, paddingBottom: 17 }}>
        <Text style={h1}>GUARDADAS</Text>
      </View>
      <RecipeList recipes={recipes} />
    </View>
  );
};

export default FavoritesPage;
