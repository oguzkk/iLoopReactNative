import { Alert } from "react-native";

export const AlertException = () => {
  Alert.alert(
    "Sorry, we are experiencing some technical difficulties, please try again later."
  );
};

export const AlertSaveSuccess = () => {
  Alert.alert("Successfully send the expenses!");
};
