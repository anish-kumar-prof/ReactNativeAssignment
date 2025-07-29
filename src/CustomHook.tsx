import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';

type User = {
  id: number;
  name: string;
  email: string;
};

const CustomHook: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Directory</Text>
      <Button title="Fetch Users" onPress={fetchData} color="#007AFF" />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No users found. Tap above to fetch.</Text>}
        />
      )}
    </View>
  );
};

export default CustomHook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 18,
    color: '#222',
    alignSelf: 'center',
    letterSpacing: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#007AFF',
  },
  listContent: {
    paddingBottom: 24,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 16,
  },
});
