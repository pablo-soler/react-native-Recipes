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
          
        />
      );
    } 
    if(index == props.recipes.length-1){
        if(h1<h2){
        recipes1.push(
          <View key={index} style={{paddingBottom: h2-h1,}}></View>
        );
      }else if(h2<h1){
        recipes2.push(
          <View key={index} style={{paddingBottom: h1-h2,}}></View>
        );
      }
      }

  }));
  
  return (
    <ScrollView
      contentContainerStyle={{ 
        flexDirection: "row",
        paddingLeft: 9,
      }}
    >
      <View style={{paddingBottom: 300,}}>{recipes1}</View>
      <View style={{paddingBottom: 300,}}>{recipes2}</View>
    </ScrollView>
  );
});

export default RecipeList;
