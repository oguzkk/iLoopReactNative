import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { AlertException } from "../helpers/alerts";
import { IAuthResponse } from "../helpers/models";
import { authanticate } from "../helpers/proxy";

export interface IAuthanticateProps {
  setAuthResponse: React.Dispatch<React.SetStateAction<IAuthResponse>>;
}

export default function Authanticate(props: IAuthanticateProps) {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    const authanticationResult = await authanticate(userName, password);
    if (authanticationResult.authenticated) {
      props.setAuthResponse(authanticationResult);
    } else {
      AlertException();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/vpLogo.png")}
      ></Image>
      <View style={styles.formContainer}>
        <View style={styles.lineContainer}>
          <Text style={styles.text}>Username: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text: string) => {
              setUserName(text);
            }}
          ></TextInput>
        </View>
        <View style={styles.lineContainer}>
          <Text style={styles.text}>Password: </Text>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text: string) => {
              setPassword(text);
            }}
          ></TextInput>
        </View>
        <View style={styles.button}>
          <Button color={"red"} title="Login" onPress={login}></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    width: "100%"
  },
  lineContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20
  },
  formContainer: {
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
    width: "50%",
    marginLeft: 25
  },
  textInput: {
    borderWidth: 2,
    fontSize: 30,
    borderColor: "red",
    marginRight: 25,
    width: "50%"
  },
  button: {
    alignItems: "center"
  },
  image: {
    width: 300,
    height: 250,
    alignSelf: "center",
    marginTop: 100
  }
});
