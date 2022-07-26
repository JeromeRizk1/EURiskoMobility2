export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (accessToken) => {
    return dispatch => {
      dispatch({ type: AUTHENTICATE, accessToken: accessToken });
    };
  };

export const logout = () => {
   return { type: LOGOUT };
};

export const login = (username, password) => {
  return async dispatch => {
    const response = await fetch(
      'http://34.245.213.76:3000/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
    );
    
    if (!response.ok) {
        const errorResData = await response.json();
        
      throw new Error(errorResData.message);
    }

    const resData = await response.json();

    dispatch(authenticate(
      resData.accessToken
    ));
    
   
  };
};