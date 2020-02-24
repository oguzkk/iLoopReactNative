import moment from "moment";
import React from "react";
import { StyleSheet, View, Text, TextInput, Picker } from "react-native";
import DatePicker from "react-native-datepicker";
import { defaultDateFormat } from "../helpers/constants";
import { IExpenseItem } from "../helpers/models";
import { StaticData } from "../helpers/staticData";

export interface IExpenseProps {
  index: number;
  item: IExpenseItem;
  updateItem(index: number, item: IExpenseItem);
}

export default function Expense(props: IExpenseProps) {
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <Text style={styles.label}>Date: </Text>
        <DatePicker
          date={moment(props.item.date, defaultDateFormat)}
          onDateChange={(dateStr: string, date: Date) => {
            const newDate = moment(date).format(defaultDateFormat);
            const newItem = { ...props.item };
            newItem.date = newDate;
            props.updateItem(props.index, newItem);
          }}
        ></DatePicker>
        <Text style={styles.label}>Bill No: </Text>
        <TextInput
          value={props.item.plug}
          style={styles.input}
          onChangeText={(text: string) => {
            const newItem = { ...props.item };
            newItem.plug = text;
            props.updateItem(props.index, newItem);
          }}
        ></TextInput>
      </View>
      <View style={styles.lineContainer}>
        <Text style={styles.label}>Project: </Text>
        <Picker
          selectedValue={props.item.projectKey}
          onValueChange={(itemValue, itemIndex) => {
            const newItem = { ...props.item };
            newItem.projectKey = itemValue;
            props.updateItem(props.index, newItem);
          }}
        >
          {StaticData.ProjectList.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.value} value={item.key} />
            );
          })}
        </Picker>
        <Text style={styles.label}>Description: </Text>
        <TextInput
          value={props.item.description}
          style={styles.input}
          onChangeText={(text: string) => {
            const newItem = { ...props.item };
            newItem.description = text;
            props.updateItem(props.index, newItem);
          }}
        ></TextInput>
      </View>
      <View style={styles.lineContainer}>
        <Text style={styles.label}>Expense: </Text>
        <TextInput
          value={props.item.expense}
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(text: string) => {
            const newItem = { ...props.item };
            newItem.expense = text;
            props.updateItem(props.index, newItem);
          }}
        ></TextInput>
        <Text style={styles.label}>Currency: </Text>
        <Picker
          selectedValue={props.item.currencyKey}
          onValueChange={(itemValue, itemIndex) => {
            const newItem = { ...props.item };
            newItem.currencyKey = itemValue;
            props.updateItem(props.index, newItem);
          }}
        >
          {StaticData.CurrencyList.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.value} value={item.key} />
            );
          })}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    width: "90%"
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    fontWeight: "bold",
    fontSize: 20
  },
  input: {
    width: "35%",
    borderWidth: 1
  }
});
