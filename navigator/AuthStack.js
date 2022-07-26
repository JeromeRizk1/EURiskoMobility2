import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../screens/AuthScreen";
import { screenOptions as AuthScreenOptions } from "../screens/AuthScreen";


const MyAuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {
    return(
        <MyAuthStack.Navigator>
            <MyAuthStack.Screen name="Auth" component={AuthScreen} options={AuthScreenOptions}/>
        </MyAuthStack.Navigator>
    );
};