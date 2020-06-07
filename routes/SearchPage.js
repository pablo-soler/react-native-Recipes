import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Image
} from "react-native";
import { Icon, Badge } from "react-native-elements";
import { c, p1, h1 } from "../StylesColors.js";
import RecipeList from "../components/RecipeList.js";
import * as Animatable from "react-native-animatable";
import { RecipesContext } from "../model/RecipesModel.js";
import { ActivityIndicator } from "react-native-paper";
import { observer } from "mobx-react";

const SearchPage = observer(() => {
  const [query, setQuery] = useState();
  const [queriesList, setQueriesList] = useState([]);

  const model = useContext(RecipesContext);

  const addQuerytoList = () => {
    if (query) {
      let currentQueriesList = [...queriesList];
      currentQueriesList.push(query.toLowerCase());
      setQueriesList(currentQueriesList);
    }

    model.getRecipies(query.toLowerCase());
    setQuery("");
    Keyboard.dismiss();
  };

  const deleteIngredient = (index) => {
    let currentQueriesList = [...queriesList];
    currentQueriesList.splice(index, 1);
    setQueriesList(currentQueriesList);
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.searchBarContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Introduce el ingrediente"}
            style={{
              textAlign: "right",
              color: c.gray4,
              height: 40,
              flex: 1,
              fontFamily: "Montserrat-Regular",
              fontSize: 13,
            }}
            onChangeText={(text) => setQuery(text)}
            value={query}
          />
        </View>
        <Icon
          raised
          containerStyle={{ backgroundColor: c.graybg }}
          style={styles.icon}
          underlayColor={c.gray2}
          name="search"
          color={c.orange}
          onPress={() => addQuerytoList()}
        />
      </View>
      <View style={styles.ingredientsList}>
        {queriesList.map((q, index) => (
          <TouchableNativeFeedback
            key={index}
            onPress={() => {
              deleteIngredient(index);
            }}
          >
            <Animatable.View
              style={{ marginLeft: 8, marginTop: 8 }}
              animation="fadeInDown"
            >
              <Badge
                badgeStyle={{
                  backgroundColor: c.graybg,
                  padding: 15,
                  elevation: 5,
                  borderRadius: 50,
                }}
                value={"x " + q}
                textStyle={p1}
              />
            </Animatable.View>
          </TouchableNativeFeedback>
        ))}
      </View>

      <View>
        {queriesList.length > 0 ?
          model.loading ? 
            <ActivityIndicator style={{marginTop: 40 }}  size="large" color={c.orange} />
           : 
            <RecipeList recipes={model.recipes} />
          
        :
          <View></View>
        }
      </View>
    </KeyboardAvoidingView>
  );
});

export default SearchPage;

const styles = {
  searchBarContainer: {
    flexDirection: "row",
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 20,
  },

  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: 10,
    paddingRight: 15,
    marginTop: 13,
    color: c.gray3,
    borderColor: c.orange,
    borderWidth: 3,
    borderRadius: 26,
    height: 44,
  },

  icon: {
    padding: 5,
    paddingRight: 30,
    fontSize: 18,
  },

  ingredientsList: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
};
