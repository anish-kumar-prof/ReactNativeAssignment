import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const Todo: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [data, setData] = useState<string[]>([]);

  const renderItem = ({ item }: { item: string }) => (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>{item}</Text>
      </View>
    );

  return (
    <>
      <Text style={styles.label}>Your Item:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name..."
        value={text}
        onChangeText={setText}
      />
      <Button title='Add Item' onPress={() => setData(prevData => [...prevData, text])} />
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </>
  );
};
export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginHorizontal: 12,
  },
  output: {
    fontSize: 16,
    color: 'gray',
  },
  title: {
    fontSize: 18,
  },
});
