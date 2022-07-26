import React from 'react';
import AppNavigator from './navigator/AppNavigator';
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from 'redux';

import authReducer from './store/reducers/auth';
import articlesReducer from './store/reducers/articles';

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App () {
  
  return (
    <Provider store={store}>
    <AppNavigator/>
    </Provider>
  );
};



export default App;
