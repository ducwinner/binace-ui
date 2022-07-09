import { createSlice } from '@reduxjs/toolkit';


interface colorsInterFace {
  backGroudPrimary: string,
  backGroudSP:  string
  backGroudHover:  string
  textPrimary:  string
  text:  string
  textBlurPrimary:  string
  textBlurTitle:  string
  priceUp:  string
  priceDown:  string
}

interface initialStateInterFace {
  colors: colorsInterFace
  darkMode: boolean
}


const initialState : initialStateInterFace = {
  colors: {
    backGroudPrimary: '#fff',
    backGroudSP: '#fafafa',
    backGroudHover: '#fff',
    textPrimary: '#C99400',
    text: '#1E2329',
    textBlurPrimary: '#707A8A',
    textBlurTitle: '#474D57',
    priceUp: '#03A66D',
    priceDown: '#CF304A',
  },
  darkMode: false
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDefaultTheme(state) {
      state.colors.backGroudPrimary = '#fff';
      state.colors.backGroudSP = '#fafafa';
      state.colors.backGroudHover = '#fff'
      state.colors.textPrimary = '#C99400';
      state.colors.text = '#1E2329';
      state.colors.textBlurPrimary = '#707A8A';
      state.colors.textBlurTitle = '#474D57';
      state.colors.priceUp = '#03A66D';
      state.colors.priceDown = '#CF304A';
      state.darkMode = false;
    },
    setDarkTheme(state) {
      state.colors.backGroudPrimary = '#181a20';
      state.colors.backGroudSP = 'rgb(11 14 17)';
      state.colors.textPrimary = 'rgb(240, 185, 11)';
      state.colors.text = 'rgb(234, 236, 239)';
      state.colors.textBlurPrimary = 'rgb(132, 142, 156)';
      state.colors.textBlurTitle = '#474D57';
      state.colors.priceUp = 'rgb(14, 203, 129)';
      state.colors.priceDown = 'rgb(246, 70, 93)';
      state.darkMode = true;
    },
  },
});

export const { setDarkTheme, setDefaultTheme } = themeSlice.actions;

export default themeSlice.reducer;
