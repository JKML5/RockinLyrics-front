import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  lyricsList: {},
  name: 'riv', // riv, all
  gender: 'F',
  category: 'LEAD',
  theme: 'light',
  fontSize: 18,
};

// actions creators
export const addLyrics = (id, lyrics) => ({
  type: 'addLyrics',
  id,
  lyrics,
});

export function toggleGender() {
  return { type: 'toggleGender' };
}

export function switchCategory() {
  return { type: 'switchCategory' };
}

export function toggleTheme(theme) {
  return { type: 'toggleTheme', theme };
}

export function incrementFontSize() {
  return { type: 'incrementFontSize' };
}

export function decrementFontSize() {
  return { type: 'decrementFontSize' };
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
    case 'toggleGender':
      return { ...state, gender: state.gender === 'M' ? 'F' : 'M' };
    case 'switchCategory':
      switch (state.category) {
        case 'BV1':
          return { ...state, category: 'BV2' };
        case 'BV2':
          return { ...state, category: 'LEAD' };
        case 'LEAD':
        default:
          return { ...state, category: 'BV1' };
      }
    case 'toggleTheme':
      return {
        ...state,
        theme: action.theme,
      };
    case 'incrementFontSize':
      return {
        ...state,
        fontSize: state.fontSize + 1,
      };
    case 'decrementFontSize':
      return {
        ...state,
        fontSize: state.fontSize - 1,
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
