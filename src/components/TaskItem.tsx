import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { TasksListProps, Task } from './TasksList'
import { IEditTask } from '../pages/Home'

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

interface TaskItemProps extends TasksListProps{
  item: Task;
  index: number;
}

export function TaskItem({item, index, toggleTaskDone, removeTask, editTask}: TaskItemProps) {
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const [ taskNewTitleValue, setTaskNewTitleValue ] = useState<string>(item.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setTaskNewTitleValue(item.title);
  }

  function handleSubmitEditing() {
    let dataEditing = {
      taskId: item.id,
      taskNewTitle: taskNewTitleValue,
    }

    editTask(dataEditing)
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <>
      <View>
          <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(item.id)}
          >
            <View 
                testID={`marker-${index}`}
                //TODO - use style prop 
                style={item.done ? styles.taskMarkerDone : styles.taskMarker}
            >
                { item.done && (
                <Icon 
                    name="check"
                    size={12}
                    color="#FFF"
                />
                )}
            </View>

            <TextInput 
              ref={textInputRef}
              style={ item.done ? styles.taskTextDone : styles.taskText}
              value={taskNewTitleValue}
              editable={isEditing}
              onChangeText={setTaskNewTitleValue}
              onSubmitEditing={handleSubmitEditing}
            />
          </TouchableOpacity>
      </View>

      <View style={ styles.iconsContainer } >
        { isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        ) }

        <View 
          style={ styles.iconsDivider }
        />

        <TouchableOpacity
          disabled={isEditing}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsDivider: {
      width: 1,
      height: 24,
      backgroundColor: 'rgba(196, 196, 196, 0.24)'
    },
    iconsContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: 110,
      paddingHorizontal: 24
    }
  })