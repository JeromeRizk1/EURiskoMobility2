import React from 'react';
import { View, Text, StyleSheet, Linking, Pressable } from 'react-native';

import Colors from '../constants/Colors';

const ArticleItem = props => {
    let URL = props.web_url;
    return (
        <View style={styles.articleContainer}>
          <View style ={styles.articleTitle}><Text style={styles.articleTitleText}>{props.headline.main}</Text></View>
           <View style={{padding:5}}>
             <View style={{marginBottom:5}}>
               <View><Text>Document Type: {props.document_type}</Text></View>
               <View><Text>Source: {props.source}</Text></View>
               <View><Text>Section Name: {props.section_name}</Text></View>
             </View>
             <View><Text style={styles.bodyTitleStyle}>Abstract: </Text></View>
             <View><Text style={styles.bodyStyle}>{props.abstract}</Text></View>
             <View><Text style={styles.bodyTitleStyle}>Lead Paragraph: </Text></View>
             <View><Text style={styles.bodyStyle}>{props.lead_paragraph}</Text></View>
             <View style={styles.wordCountStyle}><Text>Word Count: {props.word_count}</Text></View>
           </View>
         <View style={styles.bottomStyle}>
           <Text style={{color: Colors.primary}}>Publish Date: {props.pub_date}</Text>
           <Pressable onPress={() => Linking.openURL(URL)}>
           {({ pressed }) =>
            <Text style={{ textDecorationLine: 'underline', color: pressed ? 'red' : 'blue'}}>HyperLink</Text>
           }
           </Pressable>
         </View>
        </View>
    );
};

const styles = StyleSheet.create({
    articleTitle:{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    articleTitleText:{
        fontSize: 20,
        fontFamily:"sans-serif-medium",
        color: Colors.accent
    },
    articleContainer:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        padding: 10,
        borderRadius: 30,
        marginTop:10,
        backgroundColor: "white"
    },
    bodyStyle:{
        color: 'black', 
        fontSize:15
    },
    bodyTitleStyle:{
        color: 'black', 
        fontSize:15,
        textDecorationLine: 'underline'
    },
    bottomStyle:{
        alignItems: "center", 
        borderTopWidth:1
    },
    wordCountStyle:{
        flexDirection:"row",
        justifyContent:"flex-end"
    }
});

export default ArticleItem;