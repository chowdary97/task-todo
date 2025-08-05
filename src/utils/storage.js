import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'APP_THEME';

export const getTheme = async () => {
  const theme = await AsyncStorage.getItem(THEME_KEY);
  return theme || 'light';
};

export const saveTheme = async (theme) => {
  await AsyncStorage.setItem(THEME_KEY, theme);
};
