import { observable, action, computed } from "mobx";
import {BASE_URL, APP_ID, APP_KEY} from "../helpers/axiosConfig";
import React, { createContext } from "react";
import axios from "axios";

class RecipesModel {
    @observable recipes = [];
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
            console.log(error);
            this.loading = false;
          })
      };

      @computed get favourites () {
        let favs = [...this.recipes.filter( r => r.favourite)];
        return favs;
      };

      @action saveIngredients = (ingredient) => this.ingredients.push(ingredient);

}

const model = new RecipesModel();

export const RecipesContext = createContext(model);

export const RecipesProvider = ({ children }) => (
    <RecipesContext.Provider value={model}>
        {children}
    </RecipesContext.Provider>
);