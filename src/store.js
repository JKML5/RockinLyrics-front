import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  lyricsList: {},
  songs: [], // from MongoDB
  name: 'festirock', // riv, festirock, all
  gender: 'F',
  category: 'LEAD',
  theme: 'light',
  fontSize: 18,
  audioPlayer: {
    googleId: '',
    isVisible: false,
    isPlaying: false,
  },
};

// actions creators
export const addLyrics = (id, lyrics) => ({
  type: 'addLyrics',
  id,
  lyrics,
});

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

export function toggleAudioPlayer(googleId) {
  return { type: 'toggleAudioPlayer', googleId };
}

export function showPlayer() {
  return { type: 'showPlayer' };
}

export function hidePlayer() {
  return { type: 'hidePlayer' };
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
    case 'toggleAudioPlayer':
      if (state.audioPlayer.googleId === action.googleId) {
        return {
          ...state,
          audioPlayer: {
            ...state.audioPlayer,
            isPlaying: !state.audioPlayer.isPlaying,
            isVisible: true,
          },
        };
      }

      return {
        ...state,
        audioPlayer: {
          googleId: action.googleId,
          isPlaying: true,
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
