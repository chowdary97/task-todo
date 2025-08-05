import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types';

const STORAGE_KEY = 'TODO_LIST';

export const saveTodos = async (todos: Todo[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error('Saving error:', e);
  }
};

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Reading error:', e);
    return [];
  }
};