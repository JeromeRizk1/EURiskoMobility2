import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  accessToken: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        accessToken: action.accessToken,
     
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};