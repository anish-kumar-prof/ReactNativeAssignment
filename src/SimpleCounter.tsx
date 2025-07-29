import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type SimpleCounterProps = {
  onChange?: (counter: number) => void;
}
const SimpleCounter: React.FC<SimpleCounterProps> = ({onChange}: SimpleCounterProps) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    onChange?.(count + 1);
    setCount(prev => prev + 1);
  }
  const decrement = () => {
    onChange?.(count - 1);
    setCount(prev => prev - 1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Counter</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonRow}>
        <Button title="➖ Decrement" onPress={decrement} />
        <Button title="➕ Increment" onPress={increment} />
      </View>
    </View>
  );
};

export default SimpleCounter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
});
