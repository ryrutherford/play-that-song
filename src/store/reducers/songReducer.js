const initState = {
  songs: [
    {id: '1', title: 'Can\'t Feel My Legs', artist: 'Don Toliver', link: '/'},
    {id: '2', title: 'Can\'t Feel My Face', artist: 'JME', link: '/'},
    {id: '3', title: 'Can\'t Feel My Arms', artist: 'Travis Scott', link: '/'}
  ]
};

const songReducer = (state = initState, action) => {
  switch(action.type){
    case 'CREATE_SONG_REQUEST':
      console.log('created song request', action.songs);
      return state;
    case 'CREATE_SONG_REQUEST_ERROR':
      console.log('create song request error', action.err);
      return state;
    case 'UPDATE_SONG_REQUEST':
      console.log('updated song request', action.songs);
      return state;
    case 'UPDATE_SONG_REQUEST_ERROR':
      console.log('update song request error', action.err);
      return state;
    default:
      return state;
  }
}

export default songReducer