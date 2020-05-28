import { observable, action } from "mobx";
import {BASE_URL, APP_ID, APP_KEY} from "../helpers/axiosConfig";
import React, { createContext } from "react";

class RecipesModel {
    @observable recipes = [];

    @action getRecipies = (query) => {
        axios.get(`${BASE_URL}/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
          .then(function (res) {
            recipes = res.data.hits;
          })
          .catch(function (error) {
            console.log(error);
          })
      }
}

const model = new RecipesModel();

export const RecipesContext = createContext(model);

export const RecipesProvider = ({ children }) => (
    <RecipesContext.Provider value={model}>
        {children}
    </RecipesContext.Provider>
);