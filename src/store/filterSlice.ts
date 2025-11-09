import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchTerm: string;
  activeSearch: string;
  category: string;
}

const initialState: FilterState = {
  searchTerm: '',
  activeSearch: '',
  category: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setActiveSearch: (state, action: PayloadAction<string>) => {
      state.activeSearch = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.activeSearch = '';
      state.category = '';
    },
  },
});

export const { setSearchTerm, setActiveSearch, setCategory, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;