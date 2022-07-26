import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, View, StyleSheet, Button, ActivityIndicator, Alert, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../components/UI/Input';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };

const AuthScreen = props => {
    
  const [isLoading, setIsLoading] = useState(false);
  const[error, setError] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          username: '',
          password: ''
        },
        inputValidities: {
          username: false,
          password: false
        },
        formIsValid: false

      });

      useEffect(()=>{
          if(error){
              Alert.alert('Unauthorized: 401', error, [{text: 'Okay'}]);
          }
      },[error]);
   
const authHandler = async () => {
        
    const action = authActions.login(formState.inputValues.username, formState.inputValues.password);
        
       setError(null); 
       setIsLoading(true); 
       try{
       await dispatch(action);
       }catch(err){
           setError(err.message);
           setIsLoading(false); 
       }
};

const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
);

const ref_to_input2 = useRef();
 
   return (

<LinearGradient 
        colors={[Colors.accent, 'white']}
        style={styles.screen}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 1, y: 1 }}>

  <KeyboardAvoidingView  keyboardVerticalOffset={50}>
   <View style = {styles.authContainer}>
   <Text style={styles.titleStyle}>Sign In</Text>
       <ScrollView>
           <Input 
           id='username' 
           placeholder="User Name"
           iconName='person-sharp' 
           keyboardType='default'
           required  
           autoCapitalize='none' 
           errorText='Please enter a valid user name.' 
           onInputChange={inputChangeHandler} 
           initialValue=''
           returnKeyType = {"next"}
           onSubmitEditing = {()=>{ref_to_input2.current.focus()}}
           />
            <Input 
           id='password' 
           placeholder='Password'
           iconName='key' 
           keyboardType='default'
           secureTextEntry 
           required 
           minLength={5} 
           autoCapitalize='none' 
           errorText='Please enter a valid password.' 
           onInputChange={inputChangeHandler} 
           initialValue=''
           refInner={ref_to_input2}
           />
           <View style={styles.buttonContainer}> 
           {isLoading ? (<ActivityIndicator size='small' color={Colors.accent}/>) : (
               <Button disabled={!formState.formIsValid} title='Login' color={Colors.accent} onPress={authHandler}/>
           )}
            </View>
       </ScrollView>
   </View>
  </KeyboardAvoidingView>
</LinearGradient>

   );
};

export const screenOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
   screen:{
       flex: 1,
       alignItems: "center"
   },
   titleStyle:{
    alignSelf: 'center', 
    fontSize: 50,
    fontWeight:'bold',
    fontFamily: 'serif',
    color: 'white', 
    padding: 10
   },
   authContainer:{
       paddingTop: 140
   },
   buttonContainer:{
       marginTop: 10,
       borderRadius: 20,
       overflow: "hidden",
       width: 250,
       alignSelf: 'center'
   }
});

export default AuthScreen;