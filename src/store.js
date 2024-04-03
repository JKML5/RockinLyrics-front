import { configureStore } from '@reduxjs/toolkit';

// Récupérer le genre depuis localStorage (s'il existe)
const savedGender = localStorage.getItem('gender');
const savedCategory = localStorage.getItem('category');
const savedTheme = localStorage.getItem('theme');

const initialState = {
  songs: [], // from MongoDB
  name: 'riv', // riv, festirock, all
  gender: savedGender || 'F',
  category: savedCategory || 'LEAD',
  theme: savedTheme || 'light',
  fontSize: 18,
  audioPlayer: {
    googleId: '',
    isVisible: false,
  },
};

// actions creators
export const addSongsMongoDB = (data) => ({
  type: 'addSongsMongoDB',
  payload: data,
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

export function launchAudioPlayer(googleId) {
  return { type: 'launchAudioPlayer', googleId };
}

export function showPlayer() {
  return { type: 'showPlayer' };
}

export function hidePlayer() {
  return { type: 'hidePlayer' };
}

const reducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'addSongsMongoDB':
      return {
        ...state,
        songs: action.payload.map((item) => ({
          id: item._id,
          title: item.title,
          artist: item.artist,
          tutorials: item.tutorials,
        })),
      };
    case 'toggleGender':
      localStorage.setItem('gender', state.gender === 'M' ? 'F' : 'M');
      return { ...state, gender: state.gender === 'M' ? 'F' : 'M' };
    case 'switchCategory':
      switch (state.category) {
        case 'BV1':
          localStorage.setItem('category', 'BV2');
          return { ...state, category: 'BV2' };
        case 'BV2':
          localStorage.setItem('category', 'LEAD');
          return { ...state, category: 'LEAD' };
        case 'LEAD':
        default:
          localStorage.setItem('category', 'BV1');
          return { ...state, category: 'BV1' };
      }
    case 'toggleTheme':
      localStorage.setItem('theme', action.theme);
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
    case 'launchAudioPlayer':
      return {
        ...state,
        audioPlayer: {
          googleId: action.googleId,
          isVisible: true,
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
