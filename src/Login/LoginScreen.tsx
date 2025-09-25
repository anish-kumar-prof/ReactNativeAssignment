import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { login } from "./authService"; // <-- our login logic

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("pistol");
  const [loading, setLoading] = useState(false);

  // Check for existing token when component mounts
  useEffect(() => {
    const checkExistingToken = async () => {
      try {
        const authData = await EncryptedStorage.getItem("auth");
        if (authData) {
          const { accessToken } = JSON.parse(authData);
          if (accessToken) {
            console.log("Existing token found, navigating to UserDash");
            // Navigate to UserDash if token exists
            navigation.replace("UserDash", { email: "eve.holt@reqres.in" });
          }
        }
      } catch (error) {
        console.error("Error checking existing token:", error);
        // If there's an error, just stay on login screen
      }
    };

    checkExistingToken();
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);

      Alert.alert("Success", "Logged in successfully ✅");

      // Navigate to UserDash screen with email parameter
      navigation.replace("UserDash", { email });
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
