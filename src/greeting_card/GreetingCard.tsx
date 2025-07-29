import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';

const GreetingCard: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <Card title='Hey Anish' message='There is a message for you' />
      <Card title='Hey Anish!!' message='There is a new message for you' />
      <Card title='Hey Anish!!!' message='There is No new message for you' />
    </View>
  );
};

export default GreetingCard;

const styles = StyleSheet.create({
    mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  });
