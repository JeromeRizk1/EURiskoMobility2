export const RELOAD_ARTICLES = "RELOAD_ARTICLES";
export const FILTERED_ARTICLES = "FILTERED_ARTICLES";
export const SET_MORE_ARTICLES = "SET_MORE_ARTICLES";

export const reloadArticles = () => {
    return async (dispatch, getState) => {
        const accessToken=getState().auth.accessToken;
        const response = await fetch(`http://34.245.213.76:3000/articles?page=0`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
        if (!response.ok) {
          const errorResData = await response.json();
          console.log(errorResData);
        }
    
        const resData = await response.json();
        dispatch({type: RELOAD_ARTICLES, articles: resData.response});
      };
}
export const filterArticles = (text, currArticles) => {
    
    const filteredList = currArticles.filter(item =>
        item.document_type.includes(text)
      );
      
    return({type: FILTERED_ARTICLES, filteredList: filteredList});
}

export const fetchMoreArticles = (Page, text) => {
    
    return async (dispatch, getState) =>{
        const accessToken=getState().auth.accessToken;
        try{

        const response = await fetch(
            `http://34.245.213.76:3000/articles?page=${Page}`,
            {
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if(!response.ok){
            throw new Error("Something went wrong!");
        }
        const resData = await response.json();
        
        if (resData.response.docs.length == 0)
        throw new Error('No more data');
        dispatch({type: SET_MORE_ARTICLES, articles: resData.response, text});

    }catch(err){
       throw err;
    }
  };
};