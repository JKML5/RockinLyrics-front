import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  lyricsList: {},
  gender: 'F',
  category: 'LEAD',
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

export function setCategoryLead() {
  return { type: 'setCategoryLead' };
}

export function setCategoryBV1() {
  return { type: 'setCategoryBV1' };
}

export function setCategoryBV2() {
  return { type: 'setCategoryBV2' };
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
    case 'setCategoryLead':
      return { ...state, category: 'LEAD' };
    case 'setCategoryBV1':
      return { ...state, category: 'BV1' };
    case 'setCategoryBV2':
      return { ...state, category: 'BV2' };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
