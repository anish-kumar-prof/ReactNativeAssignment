import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";

interface UserDetails {
  email: string;
  userName: string;
  loginTime: string;
  token: string;
}

const UserDash = ({ navigation, route }: any) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Fetch the auth object from EncryptedStorage
        const authData = await EncryptedStorage.getItem("auth");
        console.log("Retrieved auth data:", authData);
        
        if (!authData) {
          // No token found, redirect to login
          navigation.replace("LoginScreen");
          return;
        }

        // Parse the JSON and extract the token
        const { accessToken } = JSON.parse(authData);
        console.log("Extracted token:", accessToken);

        // Get user details from route params or create mock data
        const email = route?.params?.email || "user@example.com";
        const userName = email.split('@')[0];
        
        setUserDetails({
          email,
          userName,
          loginTime: new Date().toLocaleString(),
          token: accessToken.substring(0, 10) + "...", // Show partial token for security
        });
      } catch (error) {
        console.error("Error loading user details:", error);
        Alert.alert("Error", "Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, [navigation, route?.params?.email]);

  const loadUserDetails = async () => {
    setLoading(true);
    try {
      // Fetch the auth object from EncryptedStorage
      const authData = await EncryptedStorage.getItem("auth");
      
      if (!authData) {
        navigation.replace("Login");
        return;
      }

      // Parse the JSON and extract the token
      const { accessToken } = JSON.parse(authData);

      const email = route?.params?.email || userDetails?.email || "user@example.com";
      const userName = email.split('@')[0];
      
      setUserDetails({
        email,
        userName,
        loginTime: new Date().toLocaleString(),
        token: accessToken.substring(0, 10) + "...",
      });
    } catch (error) {
      console.error("Error loading user details:", error);
      Alert.alert("Error", "Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: performLogout,
        },
      ]
    );
  };

  const performLogout = async () => {
    setLogoutLoading(true);
    try {
      // Clear stored auth data
      await EncryptedStorage.removeItem("auth");
      
      // Clear any other stored user data if needed
    //   await EncryptedStorage.removeItem("user_token_backup");
      
      Alert.alert("Success", "Logged out successfully", [
        {
          text: "OK",
          onPress: () => navigation.replace("LoginScreen"),
        },
      ]);
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to logout properly");
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading user details...</Text>
      </View>
    );
  }

  if (!userDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load user details</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadUserDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Dashboard</Text>
        <Text style={styles.welcomeText}>Welcome back! 👋</Text>
      </View>

      <View style={styles.userCard}>
        <Text style={styles.cardTitle}>User Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Username:</Text>
          <Text style={styles.detailValue}>{userDetails.userName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{userDetails.email}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Login Time:</Text>
          <Text style={styles.detailValue}>{userDetails.loginTime}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Token:</Text>
          <Text style={styles.detailValue}>{userDetails.token}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={logoutLoading}
      >
        {logoutLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.logoutButtonText}>🚪 Logout</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Logged in securely with encrypted storage
        </Text>
      </View>
    </ScrollView>
  );
};

export default UserDash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6c757d",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  errorText: {
    fontSize: 18,
    color: "#dc3545",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    backgroundColor: "#fff",
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: "#6c757d",
  },
  userCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: "#212529",
    flex: 2,
    textAlign: "right",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "center",
  },
});
