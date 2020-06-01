import React from "react";
import RecipeCard from "./RecipeCard";
import { ScrollView, View } from "react-native";
import { observer } from "mobx-react";

const RecipeList = observer((props) => {
  let recipes1 = [];
  let recipes2 = [];
  let h1 = 0;
  let h2 = 0;
  
  props.recipes.map(( (r, index) => {
    let H = 100 + 40 * Math.floor(Math.random() * 3);
    if (h1 <= h2) {
      h1 += H;
      recipes1.push(
        <RecipeCard
          fromFavourites={props.fromFavourites}
          key={index}
          item={r}
          H={H}
          styles={{ flexGrow: H }}
        />
      );
    } else {
      h2 += H;
      recipes2.push(
        <RecipeCard
          fromFavourites={props.fromFavourites}
          key={index}
          item={r}
          H={H}
          styles={{ flexGrow: H }}
        />
      );
    }
  }));
  
  return (
    <ScrollView
      contentContainerStyle={{
        flexWrap: "wrap",
        flexDirection: "row",
        padding: 8,
      }}
    >
      <View>{recipes1}</View>
      <View>{recipes2}</View>
    </ScrollView>
  );
});

export default RecipeList;
