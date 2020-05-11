import React, { useState, useEffect } from "react";
import {BASE_URL, APP_ID, APP_KEY} from "../helpers/axiosConfig";
import {
  View,
  TextInput,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, Badge } from "react-native-elements";
import { c, p1, h1 } from "../StylesColors.js";
import RecipeList from "../components/RecipeList.js";
import * as Animatable from "react-native-animatable";
import axios from "axios";

//Ejemplo consulta:
//https://api.edamam.com/search?q=null&app_id=40bcce87&app_key=0077e7f685cd2a845ce597a0927a7e40&from=0&to=2

const SearchPage = ({ navigation }) => {

  const [query, setQuery] = useState();
  const [queriesList, setQueriesList] = useState([]);
  const [recipes, setRecipies] = useState([]);

  const getRecipies = (query) => {
    axios.get(`${BASE_URL}/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      .then(function (res) {
        setRecipies(res.data.hits);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const addQuerytoList = () => {
    if (query) {
      let currentQueriesList = [...queriesList];
      currentQueriesList.push(query.toLowerCase());
      setQueriesList(currentQueriesList);
    }

    getRecipies(query.toLowerCase());
    setQuery("");
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

      <View style={styles.recipesContainer}>
        <RecipeList recipes={recipes} />
      </View>
    </KeyboardAvoidingView>
  );
};

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
