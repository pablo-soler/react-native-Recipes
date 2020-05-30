import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import {c,h1} from "../StylesColors.js";
import RecipeList from "../components/RecipeList.js";
import { RecipesContext } from "../model/RecipesModel.js";
import { observer } from "mobx-react";

const FavoritesPage = observer(() => {

  const model = useContext(RecipesContext);

  return (
    <View>
      <View style={{ backgroundColor: c.graybg, padding: 32, paddingBottom: 17 }}>
        <Text style={h1}>GUARDADAS</Text>
      </View>
      <RecipeList recipes={model.favourites} fromFavourites={true} />
    </View>
  );
});

export default FavoritesPage;
