import Article from "../../model/Article";
import { FILTERED_ARTICLES, SET_MORE_ARTICLES, RELOAD_ARTICLES } from "../actions/articles";

const initialState = {
    availableArticles: [],
    filteredArticles: [],
    Page: 0
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case RELOAD_ARTICLES:
        const fetchArticles = [];
      for (var i = 0; i < action.articles.docs.length; i++) {
        let article = action.articles.docs[i];
        
        fetchArticles.push(
          new Article(
            article._id, 
              article.abstract, 
              article.web_url, 
              article.snippet, 
              article.lead_paragraph, 
              article.source, 
              article.multimedia, 
              article.headline, 
              article.keywords, 
              article.pub_date, 
              article.document_type, 
              article.news_desk, 
              article.section_name, 
              article.byline, 
              article.type_of_material, 
              article.word_count, 
              article.uri
          ),
        );
      }
      return {
        ...state,
        availableArticles: fetchArticles,
        filteredArticles: fetchArticles,
        Page: 1,
      };
      case FILTERED_ARTICLES:
        return {
          ...state,
          availableArticles: state.availableArticles,
          filteredArticles: action.filteredList,
          Page: state.Page,
        };

      case SET_MORE_ARTICLES:
       const moreArticles = [];
      for (var i = 0; i < action.articles.docs.length; i++) {
        let article = action.articles.docs[i];
        const isFound = state.availableArticles.some(item =>
          item.id === article._id ? true : false,
        );
        if (!isFound) {
          moreArticles.push(
            new Article(
              article._id, 
              article.abstract, 
              article.web_url, 
              article.snippet, 
              article.lead_paragraph, 
              article.source, 
              article.multimedia, 
              article.headline, 
              article.keywords, 
              article.pub_date, 
              article.document_type, 
              article.news_desk, 
              article.section_name, 
              article.byline, 
              article.type_of_material, 
              article.word_count, 
              article.uri
            ),
          );
        }
      }
      const filtereditems = state.availableArticles.filter(item =>
        item.document_type.includes(action.text)
      );
      
      return {
        ...state,
        availableArticles: state.availableArticles.concat(moreArticles),
        filteredArticles: filtereditems,
        Page: state.Page + 1,
      }; 
      default:
        return state;
    }
}