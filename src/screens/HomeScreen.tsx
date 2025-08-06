import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { getTodos, saveTodos } from '../storage/todoStorage';
import { Todo } from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy'; // Replace with your real Ad Unit ID in production

const HomeScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadTodos();
  }, [isFocused]);

  const loadTodos = async () => {
    const list = await getTodos();
    setTodos(list);
  };

  const deleteTodo = (id: string) => {
    Alert.alert('Delete Todo', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = todos.filter((todo) => todo.id !== id);
          await saveTodos(updated);
          setTodos(updated);
        },
      },
    ]);
  };

  const toggleCompleted = async (id: string) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
    await saveTodos(updated);
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <CheckBox
        value={item.completed}
        onValueChange={() => toggleCompleted(item.id)}
        tintColors={{ true: '#22c55e', false: '#ccc' }}
        style={styles.checkbox}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddEditTodo', { id: item.id })}
        style={{ flex: 1 }}
      >
        <Text
          style={[styles.todoTitle, item.completed && styles.completed]}
        >
          {item.title}
        </Text>
        {item.description ? (
          <Text style={styles.todoDescription}>{item.description}</Text>
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Icon name="delete" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
      />

      {/* ✅ AdMob Banner */}
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddEditTodo')}
      >
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  todoItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  todoTitle: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  completed: { textDecorationLine: 'line-through', color: '#aaa' },
  checkbox: { marginRight: 12 },
  todoDescription: { fontSize: 14, color: '#666', marginTop: 4 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    width: 60,
    height: 60,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
