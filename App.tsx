import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthResponseDafaults } from "./helpers/constants";
import { IAuthResponse } from "./helpers/models";
import Authanticate from "./pages/authanticate";
import Expenses from "./pages/expenses";

export default function App() {
  const [authResponse, setAuthResponse] = useState<IAuthResponse>(
    AuthResponseDafaults
  );

  return (
    <View style={styles.container}>
      {authResponse.authenticated ? (
        <Expenses fullName={authResponse.fullName}></Expenses>
      ) : (
        <Authanticate setAuthResponse={setAuthResponse}></Authanticate>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
});
