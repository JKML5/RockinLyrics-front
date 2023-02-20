import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  lyricsList: {},
};

// actions creators
export const addLyrics = (id, lyrics) => ({
  type: 'addLyrics',
  id,
  lyrics,
});

const reducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'addLyrics':
      return {
        ...state,
        lyricsList: {
          ...state.lyricsList,
          [action.id]: action.lyrics,
        },
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
