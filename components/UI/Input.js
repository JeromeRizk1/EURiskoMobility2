import React, {useReducer, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch(action.type){
    case INPUT_CHANGE:
       return{
           ...state,
           value: action.value,
           isValid: action.isValid
       };
       case INPUT_BLUR:
           return{
               ...state,
               touched: true
           };
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
         value: props.initialValue ? props.initialValue : '',
         isValid: props.initiallyValid,
         touched: false
    });

const { onInputChange, id } = props;

useEffect(()=>{
    if(inputState.touched){
            onInputChange(id, inputState.value, inputState.isValid);
        } 
        
},[inputState, onInputChange, id]);

const textChangeHandler = text =>{
       
    let isValid = true;

    if (props.required && text.trim().length === 0) {
        isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
    }
    
    dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
};

const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
};

   return (
    <View style = {styles.formControl}>
      <Icon name={props.iconName} size={20} color= {Colors.primary} />
      <TextInput 
      {...props}
      style = {styles.input}
      value = {inputState.value}
      onChangeText = {textChangeHandler}
      onBlur={lostFocusHandler}
      ref={props.refInner}
      />
     
      {!inputState.isValid && inputState.touched && (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{props.errorText}</Text>
      </View>)}
      
    </View>
   );
};

const styles = StyleSheet.create({

    formControl:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.accent,
        borderRadius: 20,
        marginTop: 5,
        padding: 5,
        width: 300,
        backgroundColor: 'white'

      },errorContainer:{
          marginVertical: 5,
          
      },
      errorText:{
          fontSize: 13,
          color: 'red'
      },
      input:{
        paddingHorizontal: 2,
        paddingVertical: 5,
        textAlign: "center"
      }
});

export default Input;