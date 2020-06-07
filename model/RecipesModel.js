import { observable, action, computed } from "mobx";
import {BASE_URL, APP_ID, APP_KEY} from "../helpers/axiosConfig";
import React, { createContext } from "react";
import axios from "axios";

class RecipesModel {
  @observable recipes = [];
  @observable favourites = [];
  @observable ingredients = [];
  
  @observable loading = false;
  
  @action getRecipies = (query) => {
    this.loading = true;
    
    axios.get(`${BASE_URL}/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    .then( (res) => {
      this.recipes = res.data.hits;
      this.loading = false;
    })
    .catch( (error) => {
      //console.log(error);
      this.loading = false;
    })
  };
  
  @action saveInFavourites (recipe, add){
    if(add) this.favourites.push(recipe);
    else this.favourites.remove(recipe);
  };
  
  @action saveIngredients (ingredient, add){
    if(add && !this.ingredients.find( i => i === ingredient)) this.ingredients.push(ingredient);
    else this.ingredients.remove(ingredient);
  };
}

const model = new RecipesModel();

export const RecipesContext = createContext(model);

export const RecipesProvider = ({ children }) => (
  <RecipesContext.Provider value={model}>
    {children}
  </RecipesContext.Provider>
);