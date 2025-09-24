import { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

type SimpleCounterProps = {
  onChange?: (counter: number) => void;
}
const SimpleCounter: React.FC<SimpleCounterProps> = ({onChange}: SimpleCounterProps) => {
  const [count, setCount] = useState<number>(0);
  const [lastTap, setLastTap] = useState<number>(0);
  const [scaleValue] = useState(new Animated.Value(1));

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  const increment = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      // Double tap - increment by 5
      onChange?.(count + 5);
      setCount(prev => prev + 5);
    } else {
      // Single tap - increment by 1
      onChange?.(count + 1);
      setCount(prev => prev + 1);
    }
    setLastTap(now);
    animatePress();
  }

  const decrement = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      // Double tap - decrement by 5
      onChange?.(count - 5);
      setCount(prev => prev - 5);
    } else {
      // Single tap - decrement by 1
      onChange?.(count - 1);
      setCount(prev => prev - 1);
    }
    setLastTap(now);
    animatePress();
  }

  const reset = () => {
    onChange?.(0);
    setCount(0);
    animatePress();
  }

  const getCountColor = () => {
    if (count > 0) return '#4CAF50';
    if (count < 0) return '#F44336';
    return '#333';
  };

  const getCountStyle = () => {
    return [
      styles.count,
      { color: getCountColor(), transform: [{ scale: scaleValue }] }
    ];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interactive Counter</Text>
      <TouchableOpacity onPress={reset} activeOpacity={0.7}>
        <Animated.Text style={getCountStyle()}>{count}</Animated.Text>
      </TouchableOpacity>
      <Text style={styles.hint}>Tap count to reset • Double-tap buttons for ±5</Text>
      <View style={styles.buttonRow}>
        <Button title="➖ Decrement" onPress={decrement} color={count < 0 ? '#F44336' : undefined} />
        <Button title="🔄 Reset" onPress={reset} />
        <Button title="➕ Increment" onPress={increment} color={count > 0 ? '#4CAF50' : undefined} />
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
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
});
