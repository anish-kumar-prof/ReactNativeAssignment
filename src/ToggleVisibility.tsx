import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const ToggleVisibility: React.FC = () => {
  const [hide, setHide] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Visibility Toggle</Text>
        <View style={styles.divider} />
        {hide ? (
          <Text style={styles.title}>Toggle Visibility</Text>
        ) : (
          <Text style={[styles.hiddenText, { minHeight: 29 }]}>Text is hidden</Text>
        )}
        <View style={styles.buttonRow}>
          <Text
            style={[styles.toggleButton, hide ? styles.hideBtn : styles.showBtn]}
            onPress={() => setHide(!hide)}
          >
            {hide ? 'Hide' : 'Show'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ToggleVisibility;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    minWidth: 280,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#007AFF',
    fontWeight: '600',
    minHeight: 29, // Match minHeight to hiddenText for consistent height
  },
  hiddenText: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 16,
    fontStyle: 'italic',
    minHeight: 29, // Ensures same height as title
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  toggleButton: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
    color: '#fff',
  },
  showBtn: {
    backgroundColor: '#007AFF',
  },
  hideBtn: {
    backgroundColor: '#FF3B30',
  },
});
