import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Exapnse from "../components/expense";
import { ExpenseItemDefaults } from "../helpers/constants";
import { IExpenseItem } from "../helpers/models";
import {
  getExpenseCurrencyList,
  getExpenseProjectList,
  saveExpenses
} from "../helpers/proxy";
import { AlertException, AlertSaveSuccess } from "../helpers/alerts";

export interface IExpensesProps {
  fullName: string;
}

export default function Expenses(props: IExpensesProps) {
  const [expenseList, setExpenseList] = useState<IExpenseItem[]>([
    ExpenseItemDefaults
  ]);
  useEffect(() => {
    getExpenseCurrencyList();
    getExpenseProjectList();
  }, []);

  const addNewExpense = () => {
    const expenseListClone = [...expenseList];
    expenseListClone.push(ExpenseItemDefaults);
    setExpenseList(expenseListClone);
  };

  const sendExpenses = async () => {
    const response = await saveExpenses(expenseList);
    if (response) {
      AlertSaveSuccess();
      setExpenseList([]);
    } else {
      AlertException();
    }
  };

  const updateItem = (index: number, item: IExpenseItem) => {
    const expenseListClone = [...expenseList];
    expenseListClone[index] = item;
    setExpenseList(expenseListClone);
  };

  const renderExpenses = () => {
    return expenseList.map((expenseItem, index) => {
      return (
        <Exapnse
          key={index}
          index={index}
          updateItem={updateItem}
          item={expenseItem}
        ></Exapnse>
      );
    });
  };

  const getTotalValue = () => {
    let totalValue = 0;
    expenseList.map(item => {
      const itemExpense = parseFloat(item.expense);
      totalValue = totalValue + (isNaN(itemExpense) ? 0 : itemExpense);
    });
    return totalValue;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nameContainer}>Welcome {props.fullName}!</Text>
      {renderExpenses()}
      <View>
        <Text>Total Value: {getTotalValue()}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonContainer}>
          <Button title={"Add New Expense"} onPress={addNewExpense}></Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button title={"Send Expenses"} onPress={sendExpenses}></Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%"
  },
  nameContainer: {
    margin: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
    margin: 10
  }
});
