import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_KEY = 'TODOS_V1';

export const getTodosByDate = async (date) => {
  const json = await AsyncStorage.getItem(TODOS_KEY);
  const todos = json ? JSON.parse(json) : [];
  return todos.filter(todo => todo.date === date);
};

export const getTodoById = async (id) => {
  const json = await AsyncStorage.getItem(TODOS_KEY);
  const todos = json ? JSON.parse(json) : [];
  return todos.find(todo => todo.id === id);
};

export const addTodo = async (todo) => {
  const json = await AsyncStorage.getItem(TODOS_KEY);
  const todos = json ? JSON.parse(json) : [];
  todos.push(todo);
  await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

export const updateTodo = async (todo) => {
  const json = await AsyncStorage.getItem(TODOS_KEY);
  let todos = json ? JSON.parse(json) : [];
  todos = todos.map(t => t.id === todo.id ? { ...t, ...todo } : t);
  await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

export const deleteTodo = async (id) => {
  const json = await AsyncStorage.getItem(TODOS_KEY);
  let todos = json ? JSON.parse(json) : [];
  todos = todos.filter(t => t.id !== id);
  await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};
