import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { v4 as uuidv4 } from 'uuid';
import { getTodos, saveTodos } from '../storage/todoStorage';
import { Todo } from '../types';

type RootStackParamList = {
  Home: undefined;
  AddTodo: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddTodo'>;

export const AddTodoScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState('');

  const addTodo = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Todo title cannot be empty');
      return;
    }
    try {
      const newTodo: Todo = { id: uuidv4(), title: title.trim(), completed: false };
      const existingTodos = await getTodos();
      const updatedTodos = [...existingTodos, newTodo];
      await saveTodos(updatedTodos);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter todo title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        style={[styles.button, !title.trim() && styles.buttonDisabled]}
        onPress={addTodo}
        disabled={!title.trim()}
      >
        <Text style={styles.buttonText}>Save Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
