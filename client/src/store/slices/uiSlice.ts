import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  currentView: 'daily' | 'graph' | 'outline' | 'search';
  darkMode: boolean;
}

const initialState: UiState = {
  sidebarOpen: true,
  currentView: 'daily',
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentView: (state, action: PayloadAction<UiState['currentView']>) => {
      state.currentView = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    }
  }
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setCurrentView,
  toggleDarkMode,
  setDarkMode
} = uiSlice.actions;

export default uiSlice.reducer;
