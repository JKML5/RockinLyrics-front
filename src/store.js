import { configureStore } from '@reduxjs/toolkit';

// Récupérer le genre et la catégorie depuis localStorage (s'ils existent)
const savedGender = localStorage.getItem('gender');
const savedCategory = localStorage.getItem('category');
const savedTheme = localStorage.getItem('theme');

const initialState = {
  gender: savedGender || 'F',
  category: savedCategory || null, // catégorie sélectionnée
  categories: [], // toutes les catégories disponibles
  theme: savedTheme || 'light',
  fontSize: 18,
  mediaPlayer: {
    url: '',
    type: '',
    isPlaying: false,
    isVisible: false,
  },
};

// Action creators
export const addSongsMongoDB = (data) => ({
  type: 'addSongsMongoDB',
  payload: data,
});

export const setConcertCategories = (categories) => ({
  type: 'setConcertCategories',
  payload: categories,
});

export function toggleGender() {
  return { type: 'toggleGender' };
}

export function switchCategory() {
  return { type: 'switchCategory' };
}

export function setCategories(data) {
  return { type: 'setCategories', payload: data };
}

export function toggleTheme() {
  return { type: 'toggleTheme' };
}

export function incrementFontSize() {
  return { type: 'incrementFontSize' };
}

export function decrementFontSize() {
  return { type: 'decrementFontSize' };
}

export function launchMediaPlayer(url, type) {
  return { type: 'launchMediaPlayer', payload: { url, type } };
}

export function pauseMediaPlayer() {
  return { type: 'pauseMediaPlayer' };
}

export function stopMediaPlayer() {
  return { type: 'stopMediaPlayer' };
}

export function showPlayer() {
  return { type: 'showPlayer' };
}

export function hidePlayer() {
  return { type: 'hidePlayer' };
}

// Reducer
const reducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'addSongsMongoDB': {
      const songs = action.payload.map((item) => ({
        id: item._id,
        title: item.title,
        artist: item.artist,
        tutorials: item.tutorials,
        categories: item.categories || [],
      }));

      // Extraction des catégories uniques à partir de toutes les chansons
      const allCatsSet = new Set();
      songs.forEach((song) => {
        song.categories.forEach((cat) => allCatsSet.add(cat));
      });

      const allCats = Array.from(allCatsSet);

      // Si aucune catégorie sélectionnée, prendre la première disponible
      const selectedCategory =
        state.category && allCats.includes(state.category)
          ? state.category
          : allCats[0] || null;

      if (selectedCategory) localStorage.setItem('category', selectedCategory);

      return {
        ...state,
        songs,
        categories: allCats,
        category: selectedCategory,
      };
    }

    case 'setConcertCategories': {
      const cats = action.payload || [];

      const selected =
        state.category && cats.includes(state.category)
          ? state.category
          : cats[0] || null;

      if (selected) {
        localStorage.setItem('category', selected);
      }

      return {
        ...state,
        categories: cats,
        category: selected,
      };
    }

    case 'setCategories': {
      const allCats = action.payload || [];
      const selectedCategory =
        state.category && allCats.includes(state.category)
          ? state.category
          : allCats[0] || null;

      if (selectedCategory) localStorage.setItem('category', selectedCategory);

      return {
        ...state,
        categories: allCats,
        category: selectedCategory,
      };
    }

    case 'switchCategory': {
      const cats = state.categories;
      if (!cats.length) return state;

      const current = state.category;
      const index = cats.indexOf(current);
      const next =
        index === -1 || index === cats.length - 1 ? cats[0] : cats[index + 1];

      localStorage.setItem('category', next);
      return { ...state, category: next };
    }

    case 'toggleGender': {
      const newGender = state.gender === 'M' ? 'F' : 'M';
      localStorage.setItem('gender', newGender);
      return { ...state, gender: newGender };
    }

    case 'toggleTheme': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { ...state, theme: newTheme };
    }

    case 'incrementFontSize':
      return { ...state, fontSize: state.fontSize + 1 };
    case 'decrementFontSize':
      return { ...state, fontSize: state.fontSize - 1 };

    case 'launchMediaPlayer':
      return {
        ...state,
        mediaPlayer: {
          url: action.payload.url,
          type: action.payload.type,
          isPlaying: true,
          isVisible: true,
        },
      };
    case 'pauseMediaPlayer':
      return {
        ...state,
        mediaPlayer: { ...state.mediaPlayer, isPlaying: false },
      };
    case 'stopMediaPlayer':
      return {
        ...state,
        mediaPlayer: { ...state.mediaPlayer, url: '', isPlaying: false },
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
