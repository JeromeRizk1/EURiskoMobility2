import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ArticlesScreen from "../screens/ArticlesScreen";

import { screenOptions as ArticlesScreenOptions } from "../screens/ArticlesScreen";

import Colors from "../constants/Colors";

const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Colors.accent
    },
    headerTintColor: 'white'
  };

const MyArticlesStack = createNativeStackNavigator();

export const ArticlesNavigator = () => {
    return(
        <MyArticlesStack.Navigator screenOptions={defaultNavOptions}>
          <MyArticlesStack.Screen name="Articles" component={ArticlesScreen} options={ArticlesScreenOptions}/>
        </MyArticlesStack.Navigator>
    );
};
