import React from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';
import { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onToggle }) => {
  return (
    <Pressable style={styles.item} onPress={() => onToggle(todo.id)}>
      <View style={styles.statusCircle(todo.completed)} />
      <Text style={[styles.text, todo.completed && styles.completed]}>
        {todo.title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  statusCircle: (completed: boolean) => ({
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 2,
    borderColor: completed ? '#22c55e' : '#999',
    backgroundColor: completed ? '#22c55e' : 'transparent',
  }),
  text: {
    fontSize: 16,
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});
