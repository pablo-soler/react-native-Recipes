import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SearchPage from "../routes/SearchPage";
import FavoritesPage from "../routes/FavoritesPage";
import IngredientsPage from "../routes/IngredientsPage";
import RecipePage from "../routes/RecipePage";
import {c} from "../StylesColors.js";

const Footer = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Search"
      activeColor={c.orange}
      inactiveColor={c.gray3}
      shifting
      barStyle={{ backgroundColor: c.graybg, paddingBottom: 3 }}
    >
      <Tab.Screen
        name="List"
        component={IngredientsPage}
        options={{
          tabBarColor: c.graybg,
          tabBarLabel: "LISTA INGR",
          tabBarIcon: ({ color }) => (
            <Icon name="list" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarLabel: "BUSQUEDA",
          tabBarIcon: ({ color }) => (
            <Icon name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesPage}
        options={{
          tabBarLabel: "GUARDADAS",
          tabBarIcon: ({ color }) => (
            <Icon name="favorite" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Footer;
