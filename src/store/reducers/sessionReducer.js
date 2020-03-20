const initState = {
  sessError: null,
  sessionIDs: []
}
const sessionReducer = (state = initState, action) => {
  switch(action.type){
    case 'SESSION_CREATED':
      return state;
    case 'SESSION_CREATED_ERROR':
      return {
        ...state,
        sessError: action.error
      }
    default:
      return state
  }
}

export default sessionReducer;