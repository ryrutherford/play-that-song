//initially the authError will be null
const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'SIGNIN_ERROR':
      return {
        ...state,
        authError: 'Sign In Failed - Email or Password Incorrect'
      };
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'SIGNOUT_SUCCESS':
      return state;
    case 'SIGNOUT_ERROR':
      return state;
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.err.message
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}

export default authReducer