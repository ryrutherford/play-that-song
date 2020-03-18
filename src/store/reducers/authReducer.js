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
      console.log('signout success');
      return state;
    case 'SIGNOUT_ERROR':
      console.log('signout error');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      console.log('signup error');
      return {
        ...state,
        authError: action.err.message
      }
    case "CLEAR_ERROR":
      console.log('clear error');
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}

export default authReducer