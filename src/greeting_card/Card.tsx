import { StyleSheet, Text, View } from 'react-native';

type CardProps = {
  title: string;
  message: string;
};
const Card: React.FC<CardProps> = ({title, message}) => {
  return (
    <View style={styles.container}>
        <View style={styles.absoluteBox} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttonRow}>
          <Text style={styles.title}>{message}</Text>
        </View>
      </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 200,
    width: 300,
    backgroundColor: '#eeeeee',
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
  },
  absoluteBox: {
    position: 'absolute',
    top: 90, // Move the separator lower
    width: '100%',
    height: 1,
    backgroundColor: 'green',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    flex: 1,
    width: '100%',
  },
});
