//initially the reqError will be null
const initState = {
  reqError: null
};

const songReducer = (state = initState, action) => {
  switch(action.type){
    case 'CREATE_SONG_REQUEST':
      return state;
    case 'CREATE_SONG_REQUEST_ERROR':
      return {
        ...state,
        reqError: action.err
      };
    case 'UPDATE_SONG_REQUEST':
      return state;
    case 'UPDATE_SONG_REQUEST_ERROR':
      return {
        ...state,
        reqError: action.err
      };
    case 'ALREADY_REQUESTED':
      return {
        ...state,
        reqError: action.err
      };
    case 'SONG_REQUEST_ERROR':
      return {
        ...state,
        reqError: action.err
      };
    case 'GET_DOCUMENT_ERROR':
      return {
        ...state,
        reqError: action.err
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        reqError: null
      }
    case 'UNDO_SONG_REQUEST':
      return state;
    case 'UNDO_SONG_REQUEST_ERROR':
      return {
        ...state,
        reqError: action.err
      }
    case 'DELETE_NOTIF':
      return state;
    case 'DELETE_NOTIF_ERROR':
      return {
        ...state,
        reqError: action.err
      }
    default:
      return state;
  }
}

export default songReducer