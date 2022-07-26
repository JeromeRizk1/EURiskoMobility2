import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigator } from "./AuthStack";
import { ArticlesNavigator } from "./ArticlesStack";

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.accessToken);

    return (
        <NavigationContainer>
      {isAuth && <ArticlesNavigator />}
      {!isAuth && <AuthNavigator />}
        </NavigationContainer>
    );
};

export default AppNavigator;