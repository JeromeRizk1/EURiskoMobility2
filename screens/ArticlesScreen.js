import React, { useEffect,useState } from "react";
import { View, Alert, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ArticleItem from "../components/ArticleItem";
import HeaderButton from "../components/UI/HeaderButton";
import * as articlesActions from "../store/actions/articles";
import * as authActions from "../store/actions/auth";
import Colors from "../constants/Colors";
import SearchHeader from "../components/UI/SearchHeader";

const ArticlesScreen = ()=>{

  const Data = useSelector(state => state.articles.availableArticles);
  const filteredData = useSelector(state => state.articles.filteredArticles);
  const currentPage = useSelector(state => state.articles.Page);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(true);
  const [loadedAll, setLoadedAll] = useState(false);
  const [Value, setValue] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(articlesActions.filterArticles(Value.toLowerCase(), Data));
  }, [Value]);

  
  useEffect(() => {
    if (error != '') Alert.alert('An error occured', error, [{text: 'okay'}]);
  }, [error]);

  
  useEffect(() => {
    reloadArticles();
  }, []);

  const loadNewArticles = async () => {
    if (!isLoading && !loadedAll) {
      setIsLoading(true);
      setError('');
      try {
        await dispatch(
          articlesActions.fetchMoreArticles(currentPage, Value.toLowerCase()),
        ).then(() => {
          setIsLoading(false);
        });
      } catch (err) {
        setError(err.message);
        if (err.message === 'No more data') setLoadedAll(true);
      }
    }
  };

  
  const reloadArticles = async () => {
    setIsReloading(true);
    setIsLoading(false);
    setLoadedAll(false);
    setError('');
    try {
      await dispatch(articlesActions.reloadArticles()).then(() => {
        setIsReloading(false);
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEndReached = () => {
    loadNewArticles();
  };

  
  const handleSearch = enteredText => {
    setValue(enteredText);
  };

  
  const handleCloseSearch = () => {
    setValue('');
  };

const renderArticleItem = itemData => (
      <ArticleItem 
      abstract = {itemData.item.abstract}
      web_url = {itemData.item.web_url}
      snippet = {itemData.item.snippet}
      lead_paragraph = {itemData.item.lead_paragraph}
      source = {itemData.item.source}
      multimedia = {itemData.item.multimedia}
      headline = {itemData.item.headline}
      keywords = {itemData.item.keywords}
      pub_date = {itemData.item.pub_date}
      document_type = {itemData.item.document_type}
      news_desk = {itemData.item.news_desk}
      section_name = {itemData.item.section_name}
      byline = {itemData.item.byline}
      type_of_material = {itemData.item.type_of_material}
      word_count = {itemData.item.word_count}
      uri = {itemData.item.uri}
    />
)

    return(
      <View>
        <View style={{alignItems: "flex-end", padding: 10}}>
        <SearchHeader value={Value} onSearch={handleSearch} onCloseSearch={handleCloseSearch}/>
        </View>
        {isReloading ? (
        <View style={{flex:1, marginTop: 200}}>
          <ActivityIndicator size={60} color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          onRefresh={reloadArticles}
          refreshing={isReloading}
          keyExtractor={item => item.id}
          renderItem={renderArticleItem}
          data={filteredData}
          onEndReached={(!Value)? handleEndReached :''}
        />)}
      </View>
    );
};

export const screenOptions = () => {
  
  const dispatch = useDispatch();
    return {
        headerTitle:()=><Text style={styles.headerTitleStyle}>Dashboard</Text>,
        headerLeft: ()=>(
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="LogOut"
              iconName="log-out-outline"
              color='white'
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          </HeaderButtons>)
    };
  };

const styles = StyleSheet.create({

    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitleStyle:{
      fontSize: 25, 
      color:"white",
      marginLeft: 10
    }
});

export default ArticlesScreen;