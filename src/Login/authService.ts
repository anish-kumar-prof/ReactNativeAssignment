import EncryptedStorage from "react-native-encrypted-storage";

export async function login(email: string, password: string) {
  const response = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    // body: JSON.stringify({
    //     email: 'eve.holt@reqres.in', // ✅ required test email
    //     password: 'cityslicka', // ✅ required test password
    //   }),
  });

  if (!response.ok) throw new Error("Login failed");

  const { token } = await response.json();

  // Fake refreshToken for demo
  const refreshToken = "dummy-refresh-token";

  await EncryptedStorage.setItem(
    "auth",
    JSON.stringify({ accessToken: token, refreshToken })
  );

  return { accessToken: token, refreshToken };
}
