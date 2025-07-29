import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button } from 'react-native';

type InputHandlingProps = {
  onChange?: (inputText: string) => void;
}
const InputHandling: React.FC<InputHandlingProps> = ({onChange}: InputHandlingProps) => {
  const [text, setText] = useState<string>('');
  const [name, setName] = useState<string>('');

  const onButtonPress = () => {
    setName(text);
    onChange?.(text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name..."
        value={text}
        onChangeText={setText}
      />
      <Button title='Submit' onPress={onButtonPress} />
      <Text style={styles.output}>Hello, {name}!</Text>
    </View>
  );
};

export default InputHandling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  output: {
    fontSize: 16,
    color: 'gray',
  },
});
