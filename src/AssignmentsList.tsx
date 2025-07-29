import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { RootStackParamList } from '../App';

type Assignment = {
  id: string;
  title: string;
};

const assignments: Assignment[] = [
  { id: '1', title: 'Simple Counter' },
  { id: '2', title: 'Personalized Greeting Component' },
  { id: '3', title: 'Toggle Visibility' },
  { id: '4', title: 'Timer Component' },
  { id: '5', title: 'Input Handling' },
  { id: '6', title: 'Todo' },
  { id: '7', title: 'CardGrid' },
  { id: '8', title: 'MemoizedComp' },
  { id: '9', title: 'CustomHook' },
  { id: '10', title: 'DarkModeToggle' },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AssignmentsList'>;
};

const AssignmentsList: React.FC<Props> = ({ navigation }) => {
  const onSelect = (item: Assignment) => {
    console.log(item.title);
    switch (item.id) {
      case '1':
        navigation.navigate('SimpleCounter');
        break;
      case '2':
        navigation.navigate('GreetingCard');
        break;
      case '3':
        navigation.navigate('ToggleVisibility');
        break;
      case '4':
        navigation.navigate('Timer');
        break;
      case '5':
        navigation.navigate('InputHandling');
        break;
        case '6':
        navigation.navigate('Todo');
        break;
        case '7':
        navigation.navigate('CardGrid');
        break;
        case '8':
        navigation.navigate('MemoizedComp');
        break;
        case '9':
        navigation.navigate('CustomHook');
        break;
        case '10':
        navigation.navigate('DarkModeToggle');
        break;
      default:
        break;
    }
  };

  const renderItem = ({ item }: { item: Assignment }) => (
    <View style={styles.item}>
      <Button title={item.title} onPress={() => onSelect(item)} />
      {/* <Text style={styles.title}>{item.title}</Text> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Assignments</Text>
      <FlatList
        data={assignments}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default AssignmentsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
});
