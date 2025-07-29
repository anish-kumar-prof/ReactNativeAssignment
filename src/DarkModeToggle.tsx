import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, Animated } from 'react-native';

const DarkModeToggle: React.FC = () => {
  type ThemeMode = 'dark' | 'light';
  const [mode, setMode] = useState<ThemeMode>('light');
  const [fadeAnim] = useState(new Animated.Value(1));

  const toggleMode = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.5, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const isDark = mode === 'dark';

  return (
    <Animated.View style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer, { opacity: fadeAnim }]}> 
      <Text style={[styles.title, isDark ? styles.darkText : styles.lightText]}>Hi Anish!!!</Text>
      <View style={styles.switchRowWithBorder}>
        <Text style={[styles.label, isDark ? styles.darkText : styles.lightText]}>{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
        <Switch
          value={isDark}
          onValueChange={toggleMode}
          thumbColor={isDark ? '#fff' : '#222'}
          trackColor={{ false: '#bbb', true: '#444' }}
        />
      </View>
    </Animated.View>
  );
};

export default DarkModeToggle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#f6f6f6',
  },
  darkContainer: {
    backgroundColor: '#181818',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    letterSpacing: 1,
  },
  lightText: {
    color: '#181818',
  },
  darkText: {
    color: '#f6f6f6',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 10,
  },
  switchRowWithBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#888',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
});
