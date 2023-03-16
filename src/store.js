import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  lyricsList: {},
  gender: 'F',
};

// actions creators
export const addLyrics = (id, lyrics) => ({
  type: 'addLyrics',
  id,
  lyrics,
});

export function setGenderMale() {
  return { type: 'setGenderMale' };
}

export function setGenderFemale() {
  return { type: 'setGenderFemale' };
}

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
    case 'setGenderMale':
      return { ...state, gender: 'M' };
    case 'setGenderFemale':
      return { ...state, gender: 'F' };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
