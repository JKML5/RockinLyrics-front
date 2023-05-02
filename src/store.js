import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  gender: 'F',
  category: 'LEAD',
  theme: 'light',
  fontSize: 18,
};

// actions creators
export function toggleGender() {
  return { type: 'toggleGender' };
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
    case 'toggleGender':
      return { ...state, gender: state.gender === 'M' ? 'F' : 'M' };
    case 'setCategoryLead':
      return { ...state, category: 'LEAD' };
    case 'setCategoryBV1':
      return { ...state, category: 'BV1' };
    case 'setCategoryBV2':
      return { ...state, category: 'BV2' };
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
