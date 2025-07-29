import React, { useState } from 'react';
import InputHandling from './InputHandling';
import SimpleCounter from './SimpleCounter';
import { StyleSheet, Text, View } from 'react-native';

const MemoizedComp: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Memoized Component Demo</Text>
      <View style={styles.counterSection}>
        <Text style={styles.label}>Counter:</Text>
        <View style={styles.counterRow}>
          <Text style={styles.count}>{count}</Text>
          <View style={styles.counterButtons}>
            <Text style={styles.button} onPress={() => setCount(count - 1)}>-</Text>
            <Text style={styles.button} onPress={() => setCount(count + 1)}>+</Text>
          </View>
        </View>
      </View>
      <View style={styles.inputSection}>
        <Text style={styles.label}>Type something:</Text>
        <View style={styles.inputBoxRow}>
          <InputHandling onChange={input => setText(input)} />
        </View>
      </View>
      <View style={styles.displaySection}>
        <Text style={styles.label}>Memoized Child Output:</Text>
        <MemoizedChildComp text={text} />
      </View>
    </View>
  );
};

type ChildCompProps = {
  text: string;
};
const ChildComp: React.FC<ChildCompProps> = ({
  text,
}: ChildCompProps) => {
    console.log('Chile called');
  return (
    <>
      {/* <Text>Your count: {counter}</Text> */}
      <Text>Your text: {text}</Text>
    </>
  );
};

// 👇 React.memo to memoize the component
const MemoizedChildComp = React.memo(ChildComp);

export default MemoizedComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 24,
    alignSelf: 'center',
  },
  counterSection: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#007AFF',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  counterButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    fontSize: 24,
    color: '#fff',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  inputSection: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  inputBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displaySection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
});
