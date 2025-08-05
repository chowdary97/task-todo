import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { getTodos, saveTodos } from '../storage/todoStorage';
import { Todo } from '../types';
import { v4 as uuidv4 } from 'uuid';

const AddEditTodoScreen = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'AddEditTodo'>) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (route.params?.id) {
      loadTodo(route.params.id);
    } else {
      setTitle('');
      setDescription('');
      setEditingId(undefined);
    }
  }, [route.params]);

  const loadTodo = async (id: string) => {
    const todos = await getTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setEditingId(todo.id);
    }
  };

  const save = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title cannot be empty');
      return;
    }
    const todos = await getTodos();
    let updatedTodos: Todo[];
    if (editingId) {
      updatedTodos = todos.map(t => t.id === editingId ? { ...t, title, description } : t);
    } else {
      const newTodo: Todo = { id: uuidv4(), title, description, completed: false };
      updatedTodos = [...todos, newTodo];
    }
    await saveTodos(updatedTodos);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter todo title"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description (optional)"
        style={[styles.input, { height: 80 }]}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>{editingId ? 'Update' : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEditTodoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F4F4F4' },
  // removed custom headerBar and headerText styles
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    elevation: 1,
    minHeight: 48,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
});