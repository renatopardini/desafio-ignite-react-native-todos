import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasTask = tasks.find((task) => task.title === newTaskTitle);

    if (hasTask) {
      Alert.alert('Você não pode cadastrar uma task com o mesmo nome!');
    } else {
      //TODO - add new task
      let task: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks([...tasks, task]);
    }
    
    
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    
    const updatedTasks = tasks.map(task => ({ ...task }));
    var indexTask = updatedTasks.findIndex(task => (task.id === id));
    updatedTasks[indexTask].done = ! updatedTasks[indexTask].done;
    
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    let filteredTasks = tasks.filter((filtered) => {
      return filtered.id != id;
    });
    setTasks(filteredTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})