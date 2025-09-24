import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PAGE_SIZE = 10; // items per page
const CACHE_KEY = "posts_cache";

const PaginationExample = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Load cached data on mount
  useEffect(() => {
    const loadCachedData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedData) {
          setData(JSON.parse(cachedData));
        }
      } catch (error) {
        console.error("Error reading cache:", error);
      }
    };
    loadCachedData();
    fetchData(1, true); // also fetch fresh data
  }, []);

  // Fetch data
  const fetchData = async (pageNumber: number, isRefresh = false) => {
    if (loading && !isRefresh) return;

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${PAGE_SIZE}&_page=${pageNumber}`
      );
      const result = await response.json();

      if (isRefresh) {
        setData(result); // reset list
        setHasMore(true); // reset hasMore
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(result)); // overwrite cache
      } else {
        if (result.length > 0) {
          const newData = [...data, ...result];
          setData(newData);
          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData)); // update cache
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load more when scrolled to end
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Pull to refresh
  const handleRefresh = () => {
    setPage(1);
    fetchData(1, true);
  };

  // Watch for page changes (pagination)
  useEffect(() => {
    if (page > 1) fetchData(page);
  }, [page]);

  // Render footer with loader
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
};

export default PaginationExample;

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 16,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
