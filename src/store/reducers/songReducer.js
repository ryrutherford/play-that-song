const initState = {
  reqError: null
};

const songReducer = (state = initState, action) => {
  switch(action.type){
    case 'CREATE_SONG_REQUEST':
      console.log('created song request', action.songs);
      return state;
    case 'CREATE_SONG_REQUEST_ERROR':
      console.log('create song request error', action.err);
      return {
        ...state,
        reqError: action.err
      };
    case 'UPDATE_SONG_REQUEST':
      console.log('updated song request', action.songs);
      return state;
    case 'UPDATE_SONG_REQUEST_ERROR':
      console.log('update song request error', action.err);
      return {
        ...state,
        reqError: action.err
      };
    case 'ALREADY_REQUESTED':
      console.log('already requested', action.err);
      return {
        ...state,
        reqError: action.err
      };
    case 'SONG_REQUEST_ERROR':
      console.log('song request error', action.err);
      return {
        ...state,
        reqError: action.err
      };
    case 'GET_DOCUMENT_ERROR':
      console.log('get document error', action.err);
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
      console.log('undo song request');
      return state;
    case 'UNDO_SONG_REQUEST_ERROR':
      console.log('undo song request error');
      return {
        ...state,
        reqError: action.err
      }
    case 'DELETE_NOTIF':
      console.log('DELETE NOTIF');
      return state;
    case 'DELETE_NOTIF_ERROR':
      console.log('DELETE NOTIF error', action.error);
      return {
        ...state,
        reqError: action.err
      }
    default:
      return state;
  }
}

export default songReducer