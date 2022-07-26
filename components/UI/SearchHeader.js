import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from "../../constants/Colors";

import HeaderButton from "./HeaderButton";

const SearchHeader = props => {
     
  const closeButton = (props.value) ? <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                       <Item
                                        title="Clear"
                                        iconName="close"
                                        size={23}
                                        color= {Colors.primary}
                                        onPress={props.onCloseSearch}
                                       />
                                      </HeaderButtons> : <View></View>;

    return(
        <View style={{flexDirection:"row"}}>  
          <TextInput
               placeholder="Search doc type"
               placeholderTextColor= {Colors.primary}
               style={styles.textInput} 
               value={props.value}
               onChangeText={props.onSearch}
               color='black'
               backgroundColor= 'white'
          />
          {closeButton}
        </View>
    );
};

const styles = StyleSheet.create({
    
    textInput:{
        height: 35,
        width: 150,
        borderWidth:0.5
    }
    
});

export default SearchHeader;
